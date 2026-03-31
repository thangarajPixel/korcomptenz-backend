import { Context } from 'koa';

export default {
  async search(ctx: Context) {
    try {
      const { q, page, pageSize, category } = ctx.query as {
        q?: string;
        page?: string;
        pageSize?: string;
        category?: string;
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

      // Build a map: category id -> label for normalizing insight results
      const categoryLabelMap = new Map<number, string>(
        insightCategories.map((c) => [c.id, c.label])
      );

      // Determine which content types to query based on category filter
      const filterCategory = category && category !== 'All' ? category : null;

      const isCaseStudies = !filterCategory || filterCategory === 'Case Studies';
      const isPages = !filterCategory || filterCategory === 'Pages';
      // An insight category matches if its label equals the filter
      const matchedInsightCategory = filterCategory
        ? insightCategories.find((c) => c.label === filterCategory)
        : null;
      const isInsight = !filterCategory || !!matchedInsightCategory;

      const [caseStudies, insights, pages] = await Promise.all([
        isCaseStudies
          ? strapi.db.query('api::case-study.case-study').findMany({
            where: {
              publishedAt: { $notNull: true },
              $or: [
                { title: { $containsi: searchTerm } },
                { heroSection: { description: { $containsi: searchTerm } } },
              ],
            },
            populate: { heroSection: true },
          })
          : Promise.resolve([]),

        isInsight
          ? strapi.db.query('api::insight.insight').findMany({
            where: {
              publishedAt: { $notNull: true },
              $or: [
                { isLinkOnly: { $eq: false } },
                { isLinkOnly: { $null: true } },
              ],
              ...(matchedInsightCategory
                ? { category: { id: { $eq: matchedInsightCategory.id } } }
                : {}),
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
          })
          : Promise.resolve([]),

        isPages
          ? strapi.db.query('api::page.page').findMany({
            where: {
              publishedAt: { $notNull: true },
              pageTitle: { $containsi: searchTerm },
            },
          })
          : Promise.resolve([]),
      ]);

      // Normalize results
      const normalizedCaseStudies = (caseStudies as any[]).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.heroSection?.description ?? null,
        slug: item.slug,
        date: null,
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
        // Use the related category label from DB; fall back to category map by id
        category:
          item.category?.label ??
          categoryLabelMap.get(item.category?.id) ??
          'Insight',
        type: 'insight',
      }));

      const normalizedPages = (pages as any[]).map((item) => ({
        id: item.id,
        title: item.pageTitle,
        description: item.description ?? null,
        slug: item.slug,
        date: null,
        image: null,
        category: 'Pages',
        type: 'page',
      }));

      const allResults = [
        ...normalizedCaseStudies,
        ...normalizedInsights,
        ...normalizedPages,
      ];

      // Build tabs: fixed ones + dynamic insight categories (only those with results)
      const categoryCounts = allResults.reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + 1;
        return acc;
      }, {});

      // Fixed tabs first, then dynamic insight category tabs in DB order
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

      // Paginate the current category's results
      const total = allResults.length;
      const paginatedResults = allResults.slice(offset, offset + limit);

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
