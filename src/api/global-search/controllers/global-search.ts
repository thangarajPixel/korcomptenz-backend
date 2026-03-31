import { Context } from 'koa';

export default {
  async search(ctx: Context) {
    try {
      const { q, page, pageSize, category, sort } = ctx.query as {
        q?: string;
        page?: string;
        pageSize?: string;
        category?: string;
        sort?: string; // 'newest' | 'oldest'
      };

      if (!q || typeof q !== 'string' || q.trim().length === 0) {
        return ctx.badRequest('Query parameter "q" is required');
      }

      const searchTerm = q.trim();
      const currentPage = Math.max(1, parseInt(page ?? '1', 10) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(pageSize ?? '10', 10) || 10));
      const offset = (currentPage - 1) * limit;

      // Fetch dynamic insight categories from DB
      const insightCategories = await strapi.db
        .query('api::insight-category.insight-category')
        .findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['id', 'label', 'slug'],
        });

      const categoryLabelMap = new Map<number, string>(
        insightCategories.map((c) => [c.id, c.label])
      );

      // Always fetch ALL types for accurate tab counts — category filter only affects pagination
      const [caseStudies, insights, pages] = await Promise.all([
        strapi.db.query('api::case-study.case-study').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [
              { title: { $containsi: searchTerm } },
              { heroSection: { description: { $containsi: searchTerm } } },
            ],
          },
          populate: { heroSection: true },
        }),

        strapi.db.query('api::insight.insight').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [
              { isLinkOnly: { $eq: false } },
              { isLinkOnly: { $null: true } },
            ],
            $and: [
              {
                $or: [
                  { title: { $containsi: searchTerm } },
                  { heroSection: { description: { $containsi: searchTerm } } },
                ],
              },
            ],
          },
          populate: {
            heroSection: true,
            featureImage: true,
            category: true,
          },
        }),

        // Fetch pages matching pageTitle OR having a bannerSection list item matching title/description
        (async () => {
          const bannerPopulate = {
            list: {
              on: {
                'page-componets.banner-section-list': {
                  populate: { list: true },
                },
              },
            },
          };

          const [byTitle, byBanner] = await Promise.all([
            strapi.db.query('api::page.page').findMany({
              where: {
                publishedAt: { $notNull: true },
                pageTitle: { $containsi: searchTerm },
              },
              populate: bannerPopulate,
            }),
            // Dynamic zones aren't filterable — populate and filter in memory
            strapi.db.query('api::page.page').findMany({
              where: { publishedAt: { $notNull: true } },
              populate: bannerPopulate,
            }),
          ]);

          const lowerTerm = searchTerm.toLowerCase();

          // Filter pages whose banner list contains a matching title or description
          const byBannerFiltered = (byBanner as any[]).filter((p) =>
            (p.list ?? []).some(
              (section: any) =>
                section.__component === 'page-componets.banner-section-list' &&
                (section.list ?? []).some(
                  (item: any) =>
                    item.title?.toLowerCase().includes(lowerTerm) ||
                    item.description?.toLowerCase().includes(lowerTerm)
                )
            )
          );

          // Merge and deduplicate by id
          const seen = new Set<number>();
          const merged: any[] = [];
          for (const p of [...byTitle, ...byBannerFiltered]) {
            if (!seen.has(p.id)) {
              seen.add(p.id);
              merged.push(p);
            }
          }
          return merged;
        })(),
      ]);

      // Normalize
      const normalizedCaseStudies = (caseStudies as any[]).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.heroSection?.description ?? null,
        slug: item.slug,
        date: item.publishedAt ?? null,
        image: null,
        category: 'Case Studies',
        type: 'case-study',
      }));

      const normalizedInsights = (insights as any[]).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.heroSection?.description ?? null,
        slug: item.slug,
        date: item.date ?? item.publishedAt ?? null,
        image: item.featureImage
          ? {
            url: item.featureImage.url,
            alt: item.featureImage.alternativeText ?? item.title,
            width: item.featureImage.width,
            height: item.featureImage.height,
          }
          : null,
        category:
          item.category?.label ??
          categoryLabelMap.get(item.category?.id) ??
          'Insight',
        type: 'insight',
      }));

      const normalizedPages = (pages as any[]).map((item) => {
        // Extract first banner section's title and description
        const bannerSection = (item.list ?? []).find(
          (s: any) => s.__component === 'page-componets.banner-section-list'
        );
        const firstBanner = bannerSection?.list?.[0] ?? null;

        return {
          id: item.id,
          title: item.pageTitle,
          bannerTitle: firstBanner?.title ?? null,
          description: firstBanner?.description ?? null,
          slug: item.slug,
          date: item.publishedAt ?? item.createdAt ?? null,
          image: null,
          category: 'Pages',
          type: 'page',
        };
      });

      const allResults = [
        ...normalizedCaseStudies,
        ...normalizedInsights,
        ...normalizedPages,
      ];

      // Build tabs from ALL results — never affected by category filter
      const categoryCounts = allResults.reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + 1;
        return acc;
      }, {});

      const fixedLabels = ['Case Studies', 'Pages'];
      const insightCategoryLabels = insightCategories.map((c) => c.label);
      const orderedCategoryLabels = [
        ...fixedLabels,
        ...insightCategoryLabels.filter((l) => !fixedLabels.includes(l)),
      ];

      const tabs = [
        { label: 'All', count: allResults.length },
        ...orderedCategoryLabels
          .filter((label) => categoryCounts[label] !== undefined)
          .map((label) => ({ label, count: categoryCounts[label] })),
      ];

      // Apply category filter only for pagination
      const filteredResults =
        category && category !== 'All'
          ? allResults.filter((item) => item.category === category)
          : allResults;

      // Default: newest first. sort=oldest reverses it. Items without date go last.
      filteredResults.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();
        return sort === 'oldest' ? aTime - bTime : bTime - aTime;
      });

      const total = filteredResults.length;
      const paginatedResults = filteredResults.slice(offset, offset + limit);

      return ctx.send({
        data: paginatedResults,
        meta: {
          total,
          query: searchTerm,
          pagination: {
            page: currentPage,
            pageSize: limit,
            pageCount: Math.ceil(total / limit),
          },
          tabs,
        },
      });
    } catch (error) {
      strapi.log.error('Global search error:', error);
      return ctx.internalServerError(
        process.env.NODE_ENV !== 'production'
          ? `Global search failed: ${(error as Error).message}`
          : 'Failed to perform global search'
      );
    }
  },
};
