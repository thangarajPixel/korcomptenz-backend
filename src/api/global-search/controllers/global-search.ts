import { Context } from 'koa';

const INSIGHT_LABEL_MAP: Record<string, string> = {
  blog: 'Blog',
  file: 'Whitepaper',
  podcast: 'Podcast',
  'post-webinar': 'Webinar',
  'pre-webinar': 'Webinar',
  'web-stories': 'Web Stories',
  'thirdparty-link': 'Article',
};

export default {
  async search(ctx: Context) {
    try {
      const { q } = ctx.query as { q?: string };

      if (!q || typeof q !== 'string' || q.trim().length === 0) {
        return ctx.badRequest('Query parameter "q" is required');
      }

      const searchTerm = q.trim();

      const [caseStudies, insights, pages] = await Promise.all([
        strapi.db.query('api::case-study.case-study').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [
              { title: { $containsi: searchTerm } },
              { heroSection: { description: { $containsi: searchTerm } } },
            ],
          },
          populate: {
            heroSection: true,
          },
        }),

        strapi.db.query('api::insight.insight').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [
              { title: { $containsi: searchTerm } },
              { heroSection: { description: { $containsi: searchTerm } } },
            ],
          },
          populate: {
            heroSection: true,
            featureImage: true,
            category: true,
          },
        }),

        strapi.db.query('api::page.page').findMany({
          where: {
            publishedAt: { $notNull: true },
            pageTitle: { $containsi: searchTerm },
          },
        }),
      ]);

      const normalizedCaseStudies = caseStudies.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.heroSection?.description ?? null,
        slug: item.slug,
        date: null,
        image: null,
        category: 'Case Studies',
        type: 'case-study',
      }));

      const normalizedInsights = insights.map((item) => ({
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
        category: INSIGHT_LABEL_MAP[item.content] ?? 'Insight',
        type: 'insight',
      }));

      const normalizedPages = pages.map((item) => ({
        id: item.id,
        title: item.pageTitle,
        description: null,
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

      const categoryCounts = allResults.reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + 1;
        return acc;
      }, {});

      const tabs = [
        { label: 'All', count: allResults.length },
        ...Object.entries(categoryCounts).map(([label, count]) => ({ label, count })),
      ];

      return ctx.send({
        data: allResults,
        meta: {
          total: allResults.length,
          query: searchTerm,
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
