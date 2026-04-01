import { Context } from 'koa';

// Strip HTML tags from CKEditor rich text before matching
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Recursively walk any object/array — return true if any string field contains the term
function deepMatch(obj: any, term: string): boolean {
  if (!obj || typeof obj !== 'object') return false;
  if (Array.isArray(obj)) return obj.some((v) => deepMatch(v, term));
  for (const val of Object.values(obj)) {
    if (typeof val === 'string') {
      if (stripHtml(val).toLowerCase().includes(term)) return true;
    } else if (typeof val === 'object' && val !== null) {
      if (deepMatch(val, term)) return true;
    }
  }
  return false;
}

// Shared dynamic zone populate used by all single-type pages
const pageZonePopulate = {
  list: {
    on: {
      // page-componets
      'page-componets.banner-section-list': { populate: { list: true } },
      'page-componets.sap-section-data': { populate: { list: true } },
      'page-componets.solutions-data': { populate: { list: true } },
      'page-componets.salesforce-services': { populate: { list: true } },
      'page-componets.domain-data': { populate: { list: { populate: { list: true } } } },
      'page-componets.benefit-data': { populate: { list: true } },
      'page-componets.build-data': { populate: { list: true } },
      'page-componets.inspire-section': { populate: { list: true } },
      'page-componets.faq-title': { populate: { list: true } },
      'page-componets.dark-slider-list': { populate: { list: true } },
      'page-componets.light-slider-list': { populate: { list: { populate: { list: true } } } },
      'page-componets.sticky-title-list': { populate: { list: true } },
      'page-componets.insights-section': { populate: { list: true } },
      'page-componets.demonstrate-section': { populate: { list: true } },
      'page-componets.sticky-cards-list': { populate: { list: true } },
      'page-componets.tech-data': { populate: { list: true } },
      'page-componets.stretchable-section': { populate: { list: true } },
      'page-componets.why-we-are': { populate: { list: true } },
      'page-componets.gram-banner': true,
      'page-componets.digital-benefits': { populate: { list: true } },
      'page-componets.digital-services-section': { populate: { list: { populate: { list: true } } } },
      'page-componets.digital-card-slider': { populate: { list: { populate: { list: true } } } },
      'page-componets.digital-about': true,
      'page-componets.digital-erp-list': { populate: { list: true } },
      'page-componets.digital-analytics': { populate: { list1: true, list2: true } },
      'page-componets.digital-full-lifecycle': {
        populate: {
          top: { populate: { list: true } },
          mid: { populate: { list: true } },
          bottom: true,
        },
      },
      'page-componets.digital-inspire': { populate: { list: true } },
      'page-componets.digital-card': { populate: { list: true } },
      'page-componets.combined-about-card-slider': { populate: { list: { populate: { list: true } } } },
      'page-componets.smart-forge-operational-roadblock': { populate: { list: true } },
      'page-componets.smart-forge-build': { populate: { list: true } },
      'page-componets.smart-forge-enterprises': true,
      'page-componets.export-migration': true,
      'page-componets.fabcon-ai-powered': { populate: { list: true } },
      'page-componets.fabcon-data-analytics': {
        populate: {
          top: { populate: { list: true } },
          mid: { populate: { list: true } },
          bottom: { populate: { list: true } },
        },
      },
      'page-componets.fabcon-about': true,
      'page-componets.fabcon-smart-forge': true,
      'page-componets.fabcon-led-transformation': { populate: { list: true } },
      'page-componets.fabcon-composable-intelligence': { populate: { list: true } },
      'page-componets.fabcon-fabric-ai-leadership': { populate: { list: true } },
      'page-componets.fabcon-fabric-community-conference': true,
      'page-componets.fabcon-decision-fabric': true,
      'page-componets.midmarket-enterprises': { populate: { list: true } },
      'page-componets.sap-implementation': { populate: { list: true } },
      'page-componets.slider-service-section': { populate: { list: true } },
      'page-componets.microsoft-gold-certified': { populate: { card1: true, card2: true } },
      'page-componets.sap-questionnaire': true,
      'page-componets.pricing-section': { populate: { list: true } },
      'page-componets.kpi-partner': { populate: { list: true } },
      // case-study
      'case-study.case-study-sticky-cards-list': { populate: { list: true } },
      'case-study.case-study-domain-data': { populate: { list: { populate: { list: true } } } },
      'case-study.partner-section': { populate: { list: true } },
      // about-us
      'about-us.content-showcase-section-list': { populate: { list: true } },
      'about-us.map-section-list': { populate: { list: true } },
      'about-us.our-story': true,
      'about-us.our-story-list': { populate: { list: true } },
      'about-us.people-showcase-list': { populate: { list: true } },
      'about-us.stats-section': { populate: { list: true } },
      'about-us.media-slider-section': { populate: { list: true } },
      'about-us.achievement-section': { populate: { list: true } },
      // demo-page
      'demo-page.build-demo': { populate: { list: true } },
      'demo-page.demo-banner-list': { populate: { list: true } },
      'demo-page.demo-partnership': { populate: { list: true } },
      'demo-page.demo-demonstration': { populate: { list: true } },
      'demo-page.experts-section': { populate: { list: true } },
      'demo-page.demo-opportunity': { populate: { list: true } },
      'demo-page.demo-list': { populate: { list: true } },
      // home
      'home.hero-section-one': true,
      'home.schedule-call': true,
      'home.services-section': { populate: { list: true } },
      'home.opportunity': { populate: { list: true } },
      'home.we-are-korcomptenz': { populate: { list: true } },
      // insight-section
      'insight-section.insight-list': true,
      // form-fields
      'form-fields.form': { populate: { list: true } },
      // career
      'career.open-jobs': { populate: { list: true } },
      'career.mansonry-gallery-section': { populate: { list: true } },
      'career.career-build-data': { populate: { list: true } },
      // contact-us
      'contact-us.our-office': { populate: { list: true } },
      'contact-us.office-location-list': { populate: { list: true } },
      'contact-us.news-letter': true,
      'contact-us.contact-us-insight-list': { populate: { list: true } },
      'contact-us.contact-us-form-section': { populate: { list: true } },
      'contact-us.fixed-section': true,
      'contact-us.logo-slider': { populate: { list: true } },
      // kor-cares
      'kor-cares.straight-slider': { populate: { list: true } },
      'kor-cares.kor-care-build-data': { populate: { list: true } },
      'kor-cares.impact-highlight': { populate: { list: true } },
      'kor-cares.impact-description': { populate: { list: true } },
      'kor-cares.award': { populate: { list: true } },
      // news-and-event
      'news-and-event.news-banner': true,
      'news-and-event.news-description-only': true,
      'news-and-event.news-title-description-only': true,
      'news-and-event.compounds-newsroom': { populate: { list: true } },
      'news-and-event.simple-image-gallery': { populate: { list: true } },
      'news-and-event.news-service': { populate: { list: true } },
      'news-and-event.color-custom-description': true,
      'news-and-event.testimonal-list': { populate: { list: true } },
      'news-and-event.build-data': { populate: { list: true } },
    },
  },
};

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
      const lowerTerm = searchTerm.toLowerCase();
      const currentPage = Math.max(1, parseInt(page ?? '1', 10) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(pageSize ?? '10', 10) || 10));
      const offset = (currentPage - 1) * limit;

      // Fetch dynamic insight categories for label mapping
      const insightCategories = await strapi.db
        .query('api::insight-category.insight-category')
        .findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['id', 'label', 'slug'],
        });

      const categoryLabelMap = new Map<number, string>(
        insightCategories.map((c) => [c.id, c.label])
      );

      // ─── Fetch all content in parallel ───────────────────────────────────

      const [
        rawCaseStudies,
        rawInsights,
        rawPages,
        rawEvents,
        rawNewsrooms,
        rawAboutUs,
        rawCareer,
        rawHome,
        rawContactUs,
        rawPrivacyPolicy,
      ] = await Promise.all([
        // Collection types
        strapi.db.query('api::case-study.case-study').findMany({
          where: { publishedAt: { $notNull: true } },
          populate: {
            heroSection: true,
            descriptionSection: true,
            testimonials: true,
            rightSection: true,
            offeringList: true,
            outcome: true,
            case_industries: true,
            regions: true,
            technologies: true,
            services: true,
          },
        }),

        strapi.db.query('api::insight.insight').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [
              { isLinkOnly: { $eq: false } },
              { isLinkOnly: { $null: true } },
            ],
          },
          populate: {
            heroSection: true,
            featureImage: true,
            category: true,
            technologies: true,
            services: true,
            tags: true,
            blog: { populate: { faq: { populate: { faq: { populate: { list: true } } } } } },
            podcast: { populate: { podcastPlatForm: true } },
            webinar: {
              populate: {
                expert: { populate: { list: { populate: { image: true } } } },
                demonstrate: { populate: { list: { populate: { image: true } } } },
                buildData: { populate: { thumbnail: true } },
                summary: true,
              },
            },
            preWebinar: { populate: { preSummary: { populate: { image: true } } } },
            webStories: { populate: { image: true } },
            author: { populate: { image: true } },
          },
        }),

        strapi.db.query('api::page.page').findMany({
          where: { publishedAt: { $notNull: true } },
          populate: pageZonePopulate,
        }),

        strapi.db.query('api::event.event').findMany({
          where: { publishedAt: { $notNull: true } },
          populate: { image: true },
        }),

        strapi.db.query('api::new-room.new-room').findMany({
          where: { publishedAt: { $notNull: true } },
          populate: {
            image: true,
            ...pageZonePopulate,
          },
        }),

        // Single types
        strapi.db.query('api::about-us.about-us').findOne({
          where: { publishedAt: { $notNull: true } },
          populate: pageZonePopulate,
        }),

        strapi.db.query('api::career.career').findOne({
          where: { publishedAt: { $notNull: true } },
          populate: pageZonePopulate,
        }),

        strapi.db.query('api::home.home').findOne({
          where: { publishedAt: { $notNull: true } },
          populate: pageZonePopulate,
        }),

        strapi.db.query('api::contact-us.contact-us').findOne({
          where: { publishedAt: { $notNull: true } },
          populate: pageZonePopulate,
        }),

        strapi.db.query('api::privacy-policy.privacy-policy').findOne({
          where: { publishedAt: { $notNull: true } },
          populate: { description: true },
        }),
      ]);

      // ─── Helper: extract banner from dynamic zone ─────────────────────────

      function getBanner(item: any) {
        const bannerSection = (item?.list ?? []).find(
          (s: any) => s.__component === 'page-componets.banner-section-list'
        );
        return bannerSection?.list?.[0] ?? null;
      }

      // ─── Normalize + deep-match filter ───────────────────────────────────

      const normalizedCaseStudies = (rawCaseStudies as any[])
        .filter((item) => deepMatch(item, lowerTerm))
        .map((item) => ({
          id: item.id,
          title: item.title,
          description: item.heroSection?.description ?? null,
          slug: item.slug,
          date: item.publishedAt ?? null,
          image: null,
          category: 'Case Studies',
          type: 'case-study',
          technologies: (item.technologies ?? []).map((t: any) => ({
            id: t.id, label: t.label, slug: t.slug,
            title: t.title ?? null, description: t.description ?? null,
          })),
          services: (item.services ?? []).map((s: any) => ({
            id: s.id, label: s.label, slug: s.slug,
            title: s.title ?? null, description: s.description ?? null,
          })),
          outcome: (item.outcome ?? []).map((o: any) => ({ id: o.id, label: o.label })),
          industries: (item.case_industries ?? []).map((i: any) => ({ id: i.id, label: i.label })),
          regions: (item.regions ?? []).map((r: any) => ({ id: r.id, label: r.label })),
        }));

      const normalizedInsights = (rawInsights as any[])
        .filter((item) => deepMatch(item, lowerTerm))
        .map((item) => ({
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
          thirdpartyLink: item.thirdpartyLink ?? null,
          technologies: (item.technologies ?? []).map((t: any) => ({
            id: t.id, label: t.label, slug: t.slug,
            title: t.title ?? null, description: t.description ?? null,
          })),
          services: (item.services ?? []).map((s: any) => ({
            id: s.id, label: s.label, slug: s.slug,
            title: s.title ?? null, description: s.description ?? null,
          })),
        }));

      const normalizedPages = (rawPages as any[])
        .filter((item) => deepMatch(item, lowerTerm))
        .map((item) => {
          const firstBanner = getBanner(item);
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

      const normalizedEvents = (rawEvents as any[])
        .filter((item) => deepMatch(item, lowerTerm))
        .map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description ?? null,
          slug: null,
          date: item.date ?? item.publishedAt ?? null,
          image: item.image
            ? {
              url: item.image.url,
              alt: item.image.alternativeText ?? item.title,
              width: item.image.width,
              height: item.image.height,
            }
            : null,
          category: 'Events',
          type: 'event',
        }));

      const normalizedNewsrooms = (rawNewsrooms as any[])
        .filter((item) => deepMatch(item, lowerTerm))
        .map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description ?? null,
          slug: item.slug,
          date: item.publishedAt ?? null,
          image: item.image
            ? {
              url: item.image.url,
              alt: item.image.alternativeText ?? item.title,
              width: item.image.width,
              height: item.image.height,
            }
            : null,
          category: 'Newsroom',
          type: 'newsroom',
        }));

      // Single types — wrap in array for uniform handling
      const singleTypeEntries: Array<{ raw: any; slug: string; title: string; category: string; type: string }> = [
        { raw: rawAboutUs, slug: 'about-us', title: 'About Us', category: 'Pages', type: 'about-us' },
        { raw: rawCareer, slug: 'careers', title: 'Careers', category: 'Pages', type: 'career' },
        { raw: rawHome, slug: '/', title: 'Home', category: 'Pages', type: 'home' },
        { raw: rawContactUs, slug: 'contact-us', title: 'Contact Us', category: 'Pages', type: 'contact-us' },
        { raw: rawPrivacyPolicy, slug: 'privacy-policy', title: 'Privacy Policy', category: 'Pages', type: 'privacy-policy' },
      ];

      const normalizedSingleTypes = singleTypeEntries
        .filter(({ raw }) => raw && deepMatch(raw, lowerTerm))
        .map(({ raw, slug, title, category, type }) => {
          const firstBanner = getBanner(raw);
          return {
            id: raw.id,
            title: firstBanner?.title ?? raw.title ?? title,
            description: firstBanner?.description ?? raw.description ?? null,
            slug,
            date: raw.publishedAt ?? null,
            image: null,
            category,
            type,
          };
        });

      const allResults = [
        ...normalizedCaseStudies,
        ...normalizedInsights,
        ...normalizedPages,
        ...normalizedEvents,
        ...normalizedNewsrooms,
        ...normalizedSingleTypes,
      ];

      // ─── Tabs ─────────────────────────────────────────────────────────────

      const categoryCounts = allResults.reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + 1;
        return acc;
      }, {});

      const fixedLabels = ['Case Studies', 'Events', 'Newsroom', 'Pages'];
      const orderedCategoryLabels = [
        ...fixedLabels,
        ...insightCategories.map((c) => c.label).filter((l) => !fixedLabels.includes(l)),
      ];

      const tabs = [
        { label: 'All', count: allResults.length },
        ...orderedCategoryLabels
          .map((label) => ({ label, count: categoryCounts[label] ?? 0 }))
          .sort((a, b) => b.count - a.count),
      ];

      // ─── Filter + sort + paginate ─────────────────────────────────────────

      const filteredResults =
        category && category !== 'All'
          ? allResults.filter((item) => item.category === category)
          : allResults;

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
