import { Context } from 'koa';

// Helper: extract banner title/description from a dynamiczone list (banner-section-list component)
function extractBannerData(list: any[]) {
  const bannerSection = (list ?? []).find(
    (s: any) => s.__component === 'page-componets.banner-section-list'
  );
  const firstBanner = bannerSection?.list?.[0] ?? null;
  return { bannerTitle: firstBanner?.title ?? null, description: firstBanner?.description ?? null };
}

// Helper: check if a single-type's dynamiczone banner matches search term
function matchesBanner(list: any[], regex: RegExp): boolean {
  return (list ?? []).some(
    (section: any) =>
      section.__component === 'page-componets.banner-section-list' &&
      (section.list ?? []).some(
        (item: any) =>
          regex.test(item.title ?? '') ||
          regex.test(item.description ?? '')
      )
  );
}

// Helper: check if home hero-section-one matches search term — unused, logic inlined in homeResult
// Helper: normalize image media object
function normalizeImage(media: any, fallbackAlt = '') {
  if (!media) return null;
  return {
    url: media.url,
    alt: media.alternativeText ?? fallbackAlt,
    width: media.width,
    height: media.height,
  };
}

export default {
  async search(ctx: Context) {
    try {
      const { q, page, pageSize, category, sort } = ctx.query as {
        q?: string;
        page?: string;
        pageSize?: string;
        category?: string;
        sort?: string;
      };

      if (!q || typeof q !== 'string' || q.trim().length === 0) {
        return ctx.badRequest('Query parameter "q" is required');
      }

      const searchTerm = q.trim();

      // Load stopwords from env, filter tokens against them
      const stopwords = new Set(
        (process.env.SEARCH_STOPWORDS ?? '').split(',').map((w) => w.trim().toLowerCase()).filter(Boolean)
      );

      // Split query into individual tokens, strip stopwords
      const tokens = searchTerm.split(/\s+/).filter((t) => t && !stopwords.has(t.toLowerCase()));

      if (tokens.length === 0) {
        return ctx.badRequest('Search query contains only stopwords. Please use more specific terms.');
      }

      const escapedTokens = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const wordBoundaryRegex = new RegExp(
        escapedTokens.map((t) => `\\b${t}\\b`).join('|'),
        'i'
      );
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

      const bannerDynamicPopulate = {
        list: {
          on: {
            'page-componets.banner-section-list': {
              populate: { list: true },
            },
          },
        },
      };

      const heroDynamicPopulate = {
        list: {
          on: {
            'home.hero-section-one': {
              populate: { list: true },
            },
          },
        },
      };

      const [
        caseStudies,
        insights,
        pages,
        events,
        newsRooms,
        demos,
        // single types
        aboutUs,
        careerPage,
        contactUsPage,
        homePage,
        eventListPage,
        newsListPage,
        caseStudyListPage,
        insightListPage,
        privacyPolicy,
        demoListPage,
      ] = await Promise.all([

        // ── Case Studies ──────────────────────────────────────────────────────
        (async () => {
          const baseWhere = { publishedAt: { $notNull: true } };
          const populate = {
            heroSection: { populate: { image: true } },
            outcome: true,
            case_industries: true,
            regions: true,
            technologies: true,
            services: true,
          };

          const [byTitle, byTech, byService, byOutcome, byIndustry, byRegion] =
            await Promise.all([
              strapi.db.query('api::case-study.case-study').findMany({
                where: {
                  ...baseWhere,
                  $or: [
                    ...tokens.map((t) => ({ title: { $containsi: t } })),
                    ...tokens.map((t) => ({ heroSection: { description: { $containsi: t } } })),
                  ],
                },
                populate,
              }),
              strapi.db.query('api::case-study.case-study').findMany({
                where: {
                  ...baseWhere,
                  technologies: {
                    $or: [
                      ...tokens.map((t) => ({ label: { $containsi: t } })),
                      ...tokens.map((t) => ({ title: { $containsi: t } })),
                      ...tokens.map((t) => ({ description: { $containsi: t } })),
                    ],
                  },
                },
                populate,
              }),
              strapi.db.query('api::case-study.case-study').findMany({
                where: {
                  ...baseWhere,
                  services: {
                    $or: [
                      ...tokens.map((t) => ({ label: { $containsi: t } })),
                      ...tokens.map((t) => ({ title: { $containsi: t } })),
                      ...tokens.map((t) => ({ description: { $containsi: t } })),
                    ],
                  },
                },
                populate,
              }),
              strapi.db.query('api::case-study.case-study').findMany({
                where: { ...baseWhere, outcome: { $or: tokens.map((t) => ({ label: { $containsi: t } })) } },
                populate,
              }),
              strapi.db.query('api::case-study.case-study').findMany({
                where: { ...baseWhere, case_industries: { $or: tokens.map((t) => ({ label: { $containsi: t } })) } },
                populate,
              }),
              strapi.db.query('api::case-study.case-study').findMany({
                where: { ...baseWhere, regions: { $or: tokens.map((t) => ({ label: { $containsi: t } })) } },
                populate,
              }),
            ]);

          const seen = new Set<number>();
          const merged: any[] = [];
          for (const item of [...byTitle, ...byTech, ...byService, ...byOutcome, ...byIndustry, ...byRegion]) {
            if (!seen.has(item.id)) { seen.add(item.id); merged.push(item); }
          }
          return merged;
        })(),

        // ── Insights ──────────────────────────────────────────────────────────
        (async () => {
          const baseWhere = {
            publishedAt: { $notNull: true },
            $and: [{ $or: [{ isLinkOnly: { $eq: false } }, { isLinkOnly: { $null: true } }] }],
          };
          const populate = { heroSection: true, featureImage: true, category: true, technologies: true, services: true };

          const [byTitle, byTech, byService] = await Promise.all([
            strapi.db.query('api::insight.insight').findMany({
              where: {
                ...baseWhere,
                $or: [
                  ...tokens.map((t) => ({ title: { $containsi: t } })),
                  ...tokens.map((t) => ({ heroSection: { description: { $containsi: t } } })),
                ],
              },
              populate,
            }),
            strapi.db.query('api::insight.insight').findMany({
              where: {
                ...baseWhere,
                technologies: {
                  $or: [
                    ...tokens.map((t) => ({ label: { $containsi: t } })),
                    ...tokens.map((t) => ({ title: { $containsi: t } })),
                    ...tokens.map((t) => ({ description: { $containsi: t } })),
                  ],
                },
              },
              populate,
            }),
            strapi.db.query('api::insight.insight').findMany({
              where: {
                ...baseWhere,
                services: {
                  $or: [
                    ...tokens.map((t) => ({ label: { $containsi: t } })),
                    ...tokens.map((t) => ({ title: { $containsi: t } })),
                    ...tokens.map((t) => ({ description: { $containsi: t } })),
                  ],
                },
              },
              populate,
            }),
          ]);

          const seen = new Set<number>();
          const merged: any[] = [];
          for (const item of [...byTitle, ...byTech, ...byService]) {
            if (!seen.has(item.id)) { seen.add(item.id); merged.push(item); }
          }
          return merged;
        })(),

        // ── Pages (collection) ────────────────────────────────────────────────
        (async () => {
          const [byTitle, byBanner] = await Promise.all([
            strapi.db.query('api::page.page').findMany({
              where: {
                publishedAt: { $notNull: true },
                $or: tokens.map((t) => ({ pageTitle: { $containsi: t } })),
              },
              populate: bannerDynamicPopulate,
            }),
            strapi.db.query('api::page.page').findMany({
              where: { publishedAt: { $notNull: true } },
              populate: bannerDynamicPopulate,
            }),
          ]);

          const byBannerFiltered = (byBanner as any[]).filter((p) => matchesBanner(p.list, wordBoundaryRegex));

          const seen = new Set<number>();
          const merged: any[] = [];
          for (const p of [...byTitle, ...byBannerFiltered]) {
            if (!seen.has(p.id)) { seen.add(p.id); merged.push(p); }
          }
          return merged;
        })(),

        // ── Events (collection) ───────────────────────────────────────────────
        strapi.db.query('api::event.event').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [
              ...tokens.map((t) => ({ title: { $containsi: t } })),
              ...tokens.map((t) => ({ description: { $containsi: t } })),
            ],
          },
          populate: { image: true },
        }),

        // ── News Room (collection) ────────────────────────────────────────────
        strapi.db.query('api::new-room.new-room').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [
              ...tokens.map((t) => ({ title: { $containsi: t } })),
              ...tokens.map((t) => ({ description: { $containsi: t } })),
            ],
          },
          populate: { image: true },
        }),

        // ── Demos (collection) ────────────────────────────────────────────────
        strapi.db.query('api::book-demo.book-demo').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [
              ...tokens.map((t) => ({ title: { $containsi: t } })),
              ...tokens.map((t) => ({ description: { $containsi: t } })),
            ],
          },
        }),

        // ── About Us (single) ─────────────────────────────────────────────────
        strapi.db.query('api::about-us.about-us').findOne({ populate: bannerDynamicPopulate }),

        // ── Career (single) ───────────────────────────────────────────────────
        strapi.db.query('api::career.career').findOne({ populate: bannerDynamicPopulate }),

        // ── Contact Us (single) ───────────────────────────────────────────────
        strapi.db.query('api::contact-us.contact-us').findOne({ populate: bannerDynamicPopulate }),

        // ── Home (single) ─────────────────────────────────────────────────────
        strapi.db.query('api::home.home').findOne({ populate: heroDynamicPopulate }),

        // ── Event List (single) ───────────────────────────────────────────────
        strapi.db.query('api::event-list.event-list').findOne({
          populate: {
            list: { on: { 'demo-page.demo-banner-list': { populate: { list: true } } } },
          },
        }),

        // ── News List (single) ────────────────────────────────────────────────
        strapi.db.query('api::news-list.news-list').findOne({
          populate: {
            list: { on: { 'demo-page.demo-banner-list': { populate: { list: true } } } },
          },
        }),

        // ── Case Study List (single) ──────────────────────────────────────────
        strapi.db.query('api::case-study-list.case-study-list').findOne({
          populate: { banner: true },
        }),

        // ── Insight List Page (single) ────────────────────────────────────────
        strapi.db.query('api::insight-list-page.insight-list-page').findOne({
          populate: { banner: true },
        }),

        // ── Privacy Policy (single) ───────────────────────────────────────────
        strapi.db.query('api::privacy-policy.privacy-policy').findOne({
          populate: { description: true },
        }),

        // ── Demo List (single) ────────────────────────────────────────────────
        strapi.db.query('api::demo-list.demo-list').findOne({
          populate: {
            list: { on: { 'demo-page.demo-banner-list': { populate: { list: true } } } },
          },
        }),
      ]);

      // ── Normalize helpers ─────────────────────────────────────────────────

      // Single type: has dynamiczone with banner-section-list
      function normalizeSingleBanner(item: any, label: string, slug: string) {
        if (!item) return null;
        const { bannerTitle, description } = extractBannerData(item.list ?? []);
        const matches =
          wordBoundaryRegex.test(bannerTitle ?? '') ||
          wordBoundaryRegex.test(description ?? '');
        if (!matches) return null;
        return {
          id: `single-${label.toLowerCase().replace(/\s+/g, '-')}`,
          title: bannerTitle ?? label,
          description: description ?? null,
          slug,
          date: item.publishedAt ?? item.updatedAt ?? null,
          image: null,
          category: 'Pages',
          type: 'single-page',
        };
      }

      // Single type: has direct banner component (case-study-list, insight-list-page)
      function normalizeSingleDirectBanner(item: any, label: string, slug: string) {
        if (!item?.banner) return null;
        const { title, description } = item.banner;
        const matches =
          wordBoundaryRegex.test(title ?? '') ||
          wordBoundaryRegex.test(description ?? '');
        if (!matches) return null;
        return {
          id: `single-${label.toLowerCase().replace(/\s+/g, '-')}`,
          title: title ?? label,
          description: description ?? null,
          slug,
          date: item.publishedAt ?? item.updatedAt ?? null,
          image: null,
          category: 'Pages',
          type: 'single-page',
        };
      }

      // ── Normalize results ─────────────────────────────────────────────────

      const normalizedCaseStudies = (caseStudies as any[]).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.heroSection?.description ?? null,
        slug: item.slug,
        date: item.publishedAt ?? null,
        image: normalizeImage(item.heroSection?.image, item.title),
        category: 'Case Studies',
        type: 'case-study',
        technologies: (item.technologies ?? []).map((t: any) => ({ id: t.id, label: t.label, slug: t.slug, title: t.title ?? null, description: t.description ?? null })),
        services: (item.services ?? []).map((s: any) => ({ id: s.id, label: s.label, slug: s.slug, title: s.title ?? null, description: s.description ?? null })),
        outcome: (item.outcome ?? []).map((o: any) => ({ id: o.id, label: o.label })),
        industries: (item.case_industries ?? []).map((i: any) => ({ id: i.id, label: i.label })),
        regions: (item.regions ?? []).map((r: any) => ({ id: r.id, label: r.label })),
      }));

      const normalizedInsights = (insights as any[]).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.heroSection?.description ?? null,
        slug: item.slug,
        date: item.date ?? item.publishedAt ?? null,
        image: normalizeImage(item.featureImage, item.title),
        category: item.category?.label ?? categoryLabelMap.get(item.category?.id) ?? 'Insight',
        type: 'insight',
        thirdpartyLink: item.thirdpartyLink ?? null,
        isTarget: item.isTarget ?? null,
        technologies: (item.technologies ?? []).map((t: any) => ({ id: t.id, label: t.label, slug: t.slug, title: t.title ?? null, description: t.description ?? null })),
        services: (item.services ?? []).map((s: any) => ({ id: s.id, label: s.label, slug: s.slug, title: s.title ?? null, description: s.description ?? null })),
      }));

      const normalizedPages = (pages as any[]).map((item) => {
        const { bannerTitle, description } = extractBannerData(item.list ?? []);
        return {
          id: item.id,
          title: item.pageTitle,
          bannerTitle: bannerTitle ?? null,
          description: description ?? null,
          slug: item.slug,
          date: item.publishedAt ?? item.createdAt ?? null,
          image: null,
          category: 'Pages',
          type: 'page',
        };
      });

      const normalizedEvents = (events as any[]).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description ?? null,
        slug: null,
        date: item.date ?? item.publishedAt ?? null,
        image: normalizeImage(item.image, item.title),
        category: 'Events',
        type: 'event',
        buttonText: item.buttonText ?? null,
        buttonLink: item.buttonLink ?? null,
      }));

      const normalizedNewsRooms = (newsRooms as any[]).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description ?? null,
        slug: item.slug,
        date: item.publishedAt ?? null,
        image: normalizeImage(item.image, item.title),
        category: 'News Room',
        type: 'news-room',
      }));

      const normalizedDemos = (demos as any[]).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description ?? null,
        slug: null,
        date: item.date ?? item.publishedAt ?? null,
        image: null,
        category: 'Demos',
        type: 'demo',
        buttonText: item.buttonText ?? null,
        buttonLink: item.buttonLink ?? null,
      }));

      // Single types — banner-section-list based
      const singleBannerPages = [
        normalizeSingleBanner(aboutUs, 'About Us', '/about-us'),
        normalizeSingleBanner(careerPage, 'Careers', '/career'),
        normalizeSingleBanner(contactUsPage, 'Contact Us', '/contact-us'),
      ].filter(Boolean);

      // Home — hero-section-one based — search ALL items in the list
      const homeResult = (() => {
        if (!homePage) return null;
        const heroSection = (homePage.list ?? []).find(
          (s: any) => s.__component === 'home.hero-section-one'
        );
        const items: any[] = heroSection?.list ?? [];
        const matched = items.find(
          (item: any) =>
            wordBoundaryRegex.test(item.title ?? '') ||
            wordBoundaryRegex.test(item.description ?? '')
        );
        if (!matched) return null;
        return {
          id: 'single-home',
          title: matched.title ?? 'Home',
          description: matched.description ?? null,
          slug: '/',
          date: homePage.publishedAt ?? homePage.updatedAt ?? null,
          image: null,
          category: 'Pages',
          type: 'single-page',
        };
      })();

      // Event List / News List — demo-banner-list based
      function normalizeSingleDemoBanner(item: any, label: string, slug: string) {
        if (!item) return null;
        const demoBanner = (item.list ?? []).find(
          (s: any) => s.__component === 'demo-page.demo-banner-list'
        );
        const firstItem = demoBanner?.list?.[0] ?? null;
        const title = firstItem?.title ?? null;
        const description = firstItem?.description ?? null;
        const matches =
          wordBoundaryRegex.test(title ?? '') ||
          wordBoundaryRegex.test(description ?? '');
        if (!matches) return null;
        return {
          id: `single-${label.toLowerCase().replace(/\s+/g, '-')}`,
          title: title ?? label,
          description: description ?? null,
          slug,
          date: item.publishedAt ?? item.updatedAt ?? null,
          image: null,
          category: 'Pages',
          type: 'single-page',
        };
      }

      // Privacy Policy — direct title + description component
      const privacyResult = (() => {
        if (!privacyPolicy) return null;
        const title = privacyPolicy.title ?? null;
        const description = (privacyPolicy.description ?? []).map((d: any) => d.description).join(' ');
        const matches =
          wordBoundaryRegex.test(title ?? '') ||
          wordBoundaryRegex.test(description);
        if (!matches) return null;
        return {
          id: 'single-privacy-policy',
          title: title ?? 'Privacy Policy',
          description: description || null,
          slug: '/privacy-policy',
          date: privacyPolicy.publishedAt ?? privacyPolicy.updatedAt ?? null,
          image: null,
          category: 'Pages',
          type: 'single-page',
        };
      })();

      const allResults = [
        ...normalizedCaseStudies,
        ...normalizedInsights,
        ...normalizedPages,
        ...normalizedEvents,
        ...normalizedNewsRooms,
        ...normalizedDemos,
        ...singleBannerPages,
        ...(homeResult ? [homeResult] : []),
        ...(normalizeSingleDemoBanner(eventListPage, 'Events', '/events') ? [normalizeSingleDemoBanner(eventListPage, 'Events', '/events')] : []),
        ...(normalizeSingleDemoBanner(newsListPage, 'News', '/news') ? [normalizeSingleDemoBanner(newsListPage, 'News', '/news')] : []),
        ...(normalizeSingleDirectBanner(caseStudyListPage, 'Case Studies', '/case-studies') ? [normalizeSingleDirectBanner(caseStudyListPage, 'Case Studies', '/case-studies')] : []),
        ...(normalizeSingleDirectBanner(insightListPage, 'Insights', '/insights') ? [normalizeSingleDirectBanner(insightListPage, 'Insights', '/insights')] : []),
        ...(privacyResult ? [privacyResult] : []),
        ...(normalizeSingleDemoBanner(demoListPage, 'Demo', '/book-a-demo') ? [normalizeSingleDemoBanner(demoListPage, 'Demo', '/book-a-demo')] : []),
      ];

      // Post-filter: enforce word-boundary match on title + description
      // DB queries use $containsi (broad), this narrows to word-start matches only
      const wordFiltered = allResults.filter((item) => {
        const text = `${item.title ?? ''} ${(item as any).description ?? ''} ${(item as any).bannerTitle ?? ''}`;
        return wordBoundaryRegex.test(text);
      });

      // Build tabs
      const categoryCounts = wordFiltered.reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + 1;
        return acc;
      }, {});

      const fixedLabels = ['Case Studies', 'Pages', 'Events', 'News Room', 'Demos'];
      const insightCategoryLabels = insightCategories.map((c) => c.label);
      const allCategoryLabels = [
        ...fixedLabels,
        ...insightCategoryLabels.filter((l) => !fixedLabels.includes(l)),
      ];

      const tabsWithoutAll = allCategoryLabels
        .map((label) => ({ label, count: categoryCounts[label] ?? 0 }))
        .filter((tab) => tab.count > 0)
        .sort((a, b) => b.count - a.count);

      const tabs = [
        { label: 'All', count: wordFiltered.length },
        ...tabsWithoutAll,
      ];

      // Apply category filter
      const filteredResults =
        category && category !== 'All'
          ? wordFiltered.filter((item) => item.category === category)
          : wordFiltered;

      // Sort by date
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
