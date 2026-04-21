import { Context } from 'koa';

const BASE_URL = (process.env.SITE_URL ?? 'https://www.korcomptenz.com').replace(/\/$/, '');

function entry(loc: string, lastmod: string, changefreq = 'weekly', priority = '0.8') {
  return { loc: `${BASE_URL}${loc}`, lastmod, changefreq, priority };
}

// Map insight content type to frontend URL prefix — matches frontend getLink logic
function contentPrefix(content: string, categorySlug?: string): string {
  switch (content) {
    case 'blog': return '/blog';
    case 'podcast': return '/podcast';
    case 'file': return categorySlug ? `/${categorySlug}` : '/insights';
    case 'web-stories': return '/webstories';
    case 'post-webinar':
    case 'pre-webinar': return '/webinar';
    case 'thirdparty-link': return null as any; // external link — excluded from sitemap
    default: return `/${content}`; // future types use content value directly
  }
}

export default {
  async index(ctx: Context) {
    try {
      const now = new Date().toISOString();

      const [pages, caseStudies, insights, newsRooms] = await Promise.all([
        strapi.db.query('api::page.page').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['slug', 'updatedAt'],
        }),
        strapi.db.query('api::case-study.case-study').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['slug', 'updatedAt'],
        }),
        strapi.db.query('api::insight.insight').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [{ isLinkOnly: { $eq: false } }, { isLinkOnly: { $null: true } }],
          },
          select: ['slug', 'updatedAt', 'content'],
          populate: { category: { select: ['slug'] } },
        }),
        strapi.db.query('api::new-room.new-room').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['slug', 'updatedAt'],
        }),
      ]);

      const urls = [
        // Home
        entry('/', now, 'daily', '1'),

        // Static single-type pages
        entry('/about-us', now, 'weekly', '0.8'),
        entry('/career', now, 'weekly', '0.8'),
        entry('/contact-us', now, 'weekly', '0.8'),
        entry('/insights', now, 'daily', '0.9'),
        entry('/case-studies', now, 'daily', '0.9'),
        entry('/events', now, 'weekly', '0.8'),
        entry('/newsletter', now, 'weekly', '0.8'),
        entry('/book-a-demo', now, 'weekly', '0.7'),
        entry('/privacy-policy', now, 'monthly', '0.5'),

        // Dynamic pages (collection)
        ...(pages as any[]).map((p) =>
          entry(`/${p.slug}`.replace('//', '/'), p.updatedAt ?? now, 'weekly', '0.8')
        ),

        // Case studies
        ...(caseStudies as any[]).map((c) =>
          entry(`/case-studies/${c.slug}`, c.updatedAt ?? now, 'weekly', '0.7')
        ),

        // Insights — URL prefix based on content type, skip external thirdparty-link
        ...(insights as any[]).flatMap((i) => {
          const prefix = contentPrefix(i.content, i.category?.slug);
          if (!prefix) return []; // thirdparty-link — external URL, skip
          return [entry(`${prefix}/${i.slug}`, i.updatedAt ?? now, 'weekly', '0.7')];
        }),

        // News room
        ...(newsRooms as any[]).map((n) =>
          entry(`/newsroom/${n.slug}`, n.updatedAt ?? now, 'weekly', '0.7')
        ),
      ];

      // Deduplicate by loc
      const seen = new Set<string>();
      const unique = urls.filter((u) => {
        if (seen.has(u.loc)) return false;
        seen.add(u.loc);
        return true;
      });

      return ctx.send({ urls: unique });
    } catch (error) {
      strapi.log.error('Sitemap error:', error);
      return ctx.internalServerError('Failed to generate sitemap');
    }
  },

  async categorized(ctx: Context) {
    try {
      // Fetch layout to get menu structure
      const layout = await strapi.db.query('api::layout.layout').findOne({
        where: { publishedAt: { $notNull: true } },
        populate: {
          serviceMenu: {
            populate: {
              footerLink: true,
              items: {
                populate: {
                  href: true,
                  child: {
                    populate: {
                      href: true,
                    },
                  },
                },
              },
            },
          },
          industriesMenu: {
            populate: {
              sections: {
                populate: {
                  href: true,
                  items: {
                    populate: {
                      href: true,
                    },
                  },
                },
              },
            },
          },
          ecosystemMenu: {
            populate: {
              item: {
                populate: {
                  child: {
                    populate: {
                      href: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      // Fetch all content
      const [caseStudies, insights, pages, demos] = await Promise.all([
        strapi.db.query('api::case-study.case-study').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['id', 'title', 'slug'],
        }),
        strapi.db.query('api::insight.insight').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [{ isLinkOnly: { $eq: false } }, { isLinkOnly: { $null: true } }],
          },
          select: ['id', 'title', 'slug', 'content'],
          populate: { category: { select: ['slug'] } },
        }),
        strapi.db.query('api::page.page').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['id', 'pageTitle', 'slug'],
        }),
        strapi.db.query('api::book-demo.book-demo').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['id', 'title', 'buttonLink'],
        }),
      ]);

      // Build Services section from menu
      const services = (layout?.serviceMenu ?? []).map((section: any) => ({
        title: section.title,
        url: section.footerLink ? `/${section.footerLink.slug}` : null,
        children: (section.items ?? []).flatMap((item: any) => {
          const mainItem = item.href ? {
            title: item.title,
            url: `/${item.href.slug}`,
          } : null;
          
          const childItems = (item.child ?? []).map((child: any) => ({
            title: child.title,
            url: child.href ? `/${child.href.slug}` : null,
          }));

          return [mainItem, ...childItems].filter(Boolean);
        }),
      }));

      // Build Industries section from menu
      const industries = (layout?.industriesMenu ?? []).flatMap((column: any) =>
        (column.sections ?? []).map((section: any) => ({
          title: section.title,
          url: section.href ? `/${section.href.slug}` : null,
          children: (section.items ?? []).map((item: any) => ({
            title: item.title,
            url: item.href ? `/${item.href.slug}` : null,
          })),
        }))
      );

      // Build Ecosystem section from menu
      const ecosystem = (layout?.ecosystemMenu?.item ?? []).map((item: any) => ({
        title: item.title,
        url: item.link ?? null,
        children: (item.child ?? []).map((child: any) => ({
          title: child.title,
          url: child.href ? `/${child.href.slug}` : null,
        })),
      }));

      // Build Case Studies section
      const caseStudiesSection = {
        title: 'Case Studies',
        url: '/case-studies',
        children: (caseStudies as any[]).map((c) => ({
          title: c.title,
          url: `/case-studies/${c.slug}`,
        })),
      };

      // Build Insights section grouped by content type
      const insightsByType = (insights as any[]).reduce((acc, insight) => {
        const prefix = contentPrefix(insight.content, insight.category?.slug);
        if (!prefix) return acc; // skip external links

        const label =
          insight.content === 'blog'
            ? 'Blogs'
            : insight.content === 'file'
            ? 'Whitepapers'
            : insight.content === 'podcast'
            ? 'Podcasts'
            : insight.content === 'post-webinar' || insight.content === 'pre-webinar'
            ? 'Webinars'
            : 'Insights';

        if (!acc[label]) {
          acc[label] = [];
        }

        acc[label].push({
          title: insight.title,
          url: `${prefix}/${insight.slug}`,
        });

        return acc;
      }, {} as Record<string, any[]>);

      const insightsSection = Object.entries(insightsByType).map(([label, items]) => ({
        title: label,
        url: label === 'Blogs' ? '/blog' : label === 'Whitepapers' ? '/insights' : `/${label.toLowerCase()}`,
        children: items,
      }));

      // Build Demos section
      const demosSection = {
        title: 'Demos',
        url: '/live-demo',
        children: (demos as any[]).map((demo) => ({
          title: demo.title,
          url: demo.buttonLink ?? null,
        })),
      };

      // Build Other Pages section (pages not in menus)
      const menuPageSlugs = new Set([
        ...services.flatMap((s) => [s.url, ...s.children.map((c) => c.url)]),
        ...industries.flatMap((i) => i.children.map((c) => c.url)),
        ...ecosystem.flatMap((e) => [e.url, ...e.children.map((c) => c.url)]),
      ].filter(Boolean));

      const otherPages = (pages as any[])
        .filter((p) => !menuPageSlugs.has(`/${p.slug}`))
        .map((p) => ({
          title: p.pageTitle,
          url: `/${p.slug}`,
        }));

      const otherPagesSection = otherPages.length
        ? {
            title: 'Other Pages',
            url: null,
            children: otherPages,
          }
        : null;

      // Build final categorized structure
      const categorized = [
        { title: 'Services', children: services },
        { title: 'Industries', children: industries },
        { title: 'Ecosystem', children: ecosystem },
        caseStudiesSection,
        { title: 'Insights', children: insightsSection },
        demosSection,
        otherPagesSection,
      ].filter(Boolean);

      return ctx.send({ data: categorized, baseUrl: BASE_URL });
    } catch (error) {
      strapi.log.error('Categorized sitemap error:', error);
      return ctx.internalServerError(
        process.env.NODE_ENV !== 'production'
          ? `Sitemap generation failed: ${(error as Error).message}`
          : 'Failed to generate categorized sitemap'
      );
    }
  },
};
