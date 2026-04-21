import { Context } from 'koa';

const BASE_URL = (process.env.SITE_URL ?? 'https://www.korcomptenz.com').replace(/\/$/, '');
const API_URL = (process.env.PUBLIC_URL ?? BASE_URL).replace(/\/$/, '');

// ── XML helpers ───────────────────────────────────────────────────────────────

function xmlEscape(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildSitemapIndex(entries: { loc: string; lastmod: string }[]) {
  const items = entries
    .map(
      (e) =>
        `  <sitemap>\n    <loc>${xmlEscape(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </sitemap>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>`;
}

function buildUrlSet(urls: { loc: string; lastmod: string; changefreq?: string; priority?: string }[]) {
  const items = urls
    .map((u) => {
      let xml = `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>`;
      if (u.changefreq) xml += `\n    <changefreq>${u.changefreq}</changefreq>`;
      if (u.priority) xml += `\n    <priority>${u.priority}</priority>`;
      xml += `\n  </url>`;
      return xml;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
}

function sendXml(ctx: Context, xml: string) {
  ctx.set('Content-Type', 'application/xml; charset=utf-8');
  ctx.body = xml;
}

// ── URL entry helpers ─────────────────────────────────────────────────────────

function entry(loc: string, lastmod: string, changefreq = 'weekly', priority = '0.8') {
  const normalized = loc.replace(/\/+/g, '/').replace(/^([^/])/, '/$1');
  return { loc: `${BASE_URL}${normalized}`, lastmod, changefreq, priority };
}

function toUrl(base: string, path: string) {
  return `${base}/${path}`.replace(/([^:])\/\/+/g, '$1/');
}

function dedup<T extends { loc: string }>(urls: T[]): T[] {
  const seen = new Set<string>();
  return urls.filter((u) => {
    if (seen.has(u.loc)) return false;
    seen.add(u.loc);
    return true;
  });
}

function insightPrefix(content: string, categorySlug?: string): string | null {
  switch (content) {
    case 'blog': return '/blog';
    case 'podcast': return '/podcast';
    case 'post-webinar':
    case 'pre-webinar': return '/webinar';
    case 'web-stories': return '/webstories';
    case 'thirdparty-link': return null;
    case 'file':
    default: return categorySlug ? `/${categorySlug}` : '/insights';
  }
}

function insightTypeKey(content: string, categorySlug?: string): string {
  switch (content) {
    case 'blog': return 'blogs';
    case 'podcast': return 'podcasts';
    case 'post-webinar':
    case 'pre-webinar': return 'webinars';
    case 'web-stories': return 'webstories';
    case 'thirdparty-link': return '__skip__';
    default: return categorySlug ?? 'insights';
  }
}

// ── Controller ────────────────────────────────────────────────────────────────

export default {

  // GET /api/sitemap  → XML sitemapindex
  // GET /api/sitemap?type=blogs  → XML urlset for that type
  async index(ctx: Context) {
    try {
      const { type } = ctx.query as { type?: string };
      const now = new Date().toISOString();

      if (type) {
        return await handleType(ctx, type, now);
      }

      // Build index — fetch insight categories for dynamic types
      const insightCategories = await strapi.db
        .query('api::insight-category.insight-category')
        .findMany({ where: { publishedAt: { $notNull: true } }, select: ['slug'] });

      const fixedTypes = [
        'other-pages',
        'casestudies',
        'services-and-technologies',
        'industries',
        'blogs',
        'podcasts',
        'webinars',
        'webstories',
      ];
      const categoryTypes = (insightCategories as any[])
        .map((c) => c.slug)
        .filter((s) => !fixedTypes.includes(s));

      const allTypes = [...fixedTypes, ...categoryTypes];

      const entries = allTypes.map((t) => ({
        loc: `${BASE_URL}/sitemap-${t}.xml`,
        lastmod: now,
      }));

      sendXml(ctx, buildSitemapIndex(entries));
    } catch (error) {
      strapi.log.error('Sitemap index error:', error);
      return ctx.internalServerError('Failed to generate sitemap');
    }
  },

  // GET /api/sitemap/categorized  → JSON for frontend sitemap page
  async categorized(ctx: Context) {
    try {
      const now = new Date().toISOString();

      const layout = await strapi.db.query('api::layout.layout').findOne({
        populate: {
          serviceMenu: {
            populate: {
              footerLink: true,
              items: { populate: { href: true, child: { populate: { href: true } } } },
            },
          },
          industriesMenu: {
            populate: {
              sections: { populate: { href: true, items: { populate: { href: true } } } },
            },
          },
          ecosystemMenu: {
            populate: {
              item: { populate: { child: { populate: { href: true } } } },
            },
          },
        },
      }) as any;

      const [caseStudies, insights, pages] = await Promise.all([
        strapi.db.query('api::case-study.case-study').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['title', 'slug', 'updatedAt'],
        }),
        strapi.db.query('api::insight.insight').findMany({
          where: {
            publishedAt: { $notNull: true },
            $or: [{ isLinkOnly: { $eq: false } }, { isLinkOnly: { $null: true } }],
          },
          select: ['title', 'slug', 'content', 'updatedAt'],
          populate: { category: { select: ['slug', 'label'] } },
        }),
        strapi.db.query('api::page.page').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['pageTitle', 'slug', 'updatedAt'],
        }),
      ]);

      // Services
      const services = (layout?.serviceMenu ?? []).map((section: any) => ({
        title: section.title,
        url: section.footerLink?.slug ? toUrl(BASE_URL, section.footerLink.slug) : null,
        lastmod: now,
        children: (section.items ?? []).flatMap((item: any) => {
          const main = item.href?.slug ? [{ title: item.title, url: toUrl(BASE_URL, item.href.slug), lastmod: now }] : [];
          const children = (item.child ?? [])
            .filter((c: any) => c.href?.slug)
            .map((c: any) => ({ title: c.title, url: toUrl(BASE_URL, c.href.slug), lastmod: now }));
          return [...main, ...children];
        }),
      }));

      // Industries
      const industries = (layout?.industriesMenu ?? []).flatMap((col: any) =>
        (col.sections ?? []).map((section: any) => ({
          title: section.title,
          url: section.href?.slug ? toUrl(BASE_URL, section.href.slug) : null,
          lastmod: now,
          children: (section.items ?? [])
            .filter((i: any) => i.href?.slug)
            .map((i: any) => ({ title: i.title, url: toUrl(BASE_URL, i.href.slug), lastmod: now })),
        }))
      );

      // Ecosystem
      const ecosystem = (layout?.ecosystemMenu ?? []).map((eco: any) => ({
        title: eco.item?.title,
        url: eco.item?.link ? toUrl(BASE_URL, eco.item.link) : null,
        lastmod: now,
        children: (eco.item?.child ?? [])
          .filter((c: any) => c.href?.slug)
          .map((c: any) => ({ title: c.title, url: toUrl(BASE_URL, c.href.slug), lastmod: now })),
      }));

      // Case Studies
      const caseStudiesSection = {
        title: 'Case Studies',
        url: `${BASE_URL}/case-studies`,
        lastmod: now,
        children: (caseStudies as any[]).map((c) => ({
          title: c.title,
          url: `${BASE_URL}/case-studies/${c.slug}`,
          lastmod: c.updatedAt ?? now,
        })),
      };

      // Insights grouped by type
      const insightGroups: Record<string, any[]> = {};
      for (const i of insights as any[]) {
        const prefix = insightPrefix(i.content, i.category?.slug);
        if (!prefix) continue;
        const key = i.category?.label ?? insightTypeKey(i.content, i.category?.slug);
        if (!insightGroups[key]) insightGroups[key] = [];
        insightGroups[key].push({ title: i.title, url: toUrl(BASE_URL, `${prefix}/${i.slug}`), lastmod: i.updatedAt ?? now });
      }
      const insightsSection = {
        title: 'Insights',
        url: `${BASE_URL}/insights`,
        lastmod: now,
        children: Object.entries(insightGroups).map(([label, items]) => ({
          title: label,
          url: null,
          lastmod: now,
          children: items,
        })),
      };

      // Pages
      const pagesSection = {
        title: 'Pages',
        url: `${BASE_URL}`,
        lastmod: now,
        children: (pages as any[]).map((p) => ({
          title: p.pageTitle,
          url: toUrl(BASE_URL, p.slug),
          lastmod: p.updatedAt ?? now,
        })),
      };

      return ctx.send({
        baseUrl: BASE_URL,
        sections: [
          { title: 'Services and Ecosystems', url: `${BASE_URL}/sitemap-services-and-technologies.xml`, lastmod: now, children: [...services, ...ecosystem] },
          { title: 'Industries', url: `${BASE_URL}/sitemap-industries.xml`, lastmod: now, children: industries },
          { ...caseStudiesSection, title: 'Casestudies', url: `${BASE_URL}/sitemap-casestudies.xml` },
          { ...insightsSection, title: 'Insights', url: `${BASE_URL}/sitemap-insights.xml` },
          { title: 'All the rest of the pages', url: `${BASE_URL}/sitemap-other-pages.xml`, lastmod: now, children: pagesSection.children },
        ],
      });
    } catch (error) {
      strapi.log.error('Categorized sitemap error:', error);
      return ctx.internalServerError('Failed to generate categorized sitemap');
    }
  },
};

// ── Type handler ──────────────────────────────────────────────────────────────

async function handleType(ctx: Context, type: string, now: string) {
  switch (type) {
    case 'other-pages':
    case 'pages': {
      const rows = await strapi.db.query('api::page.page').findMany({
        where: { publishedAt: { $notNull: true } },
        select: ['slug', 'updatedAt'],
      });
      const staticPages = [
        entry('/', now, 'daily', '1'),
        entry('/about-us', now, 'weekly', '0.8'),
        entry('/career', now, 'weekly', '0.8'),
        entry('/contact-us', now, 'weekly', '0.8'),
        entry('/insights', now, 'daily', '0.9'),
        entry('/case-studies', now, 'daily', '0.9'),
        entry('/events', now, 'weekly', '0.8'),
        entry('/news', now, 'weekly', '0.8'),
        entry('/book-a-demo', now, 'weekly', '0.7'),
        entry('/privacy-policy', now, 'monthly', '0.5'),
      ];
      const dynamic = (rows as any[]).map((p) =>
        entry(`/${p.slug}`.replace('//', '/'), p.updatedAt ?? now)
      );
      sendXml(ctx, buildUrlSet(dedup([...staticPages, ...dynamic])));
      return;
    }

    case 'casestudies':
    case 'case-studies': {
      const rows = await strapi.db.query('api::case-study.case-study').findMany({
        where: { publishedAt: { $notNull: true } },
        select: ['slug', 'updatedAt'],
      });
      sendXml(ctx, buildUrlSet(dedup(
        (rows as any[]).map((c) => entry(`/case-studies/${c.slug}`, c.updatedAt ?? now))
      )));
      return;
    }

    case 'news-room': {
      const rows = await strapi.db.query('api::new-room.new-room').findMany({
        where: { publishedAt: { $notNull: true } },
        select: ['slug', 'updatedAt'],
      });
      sendXml(ctx, buildUrlSet(dedup(
        (rows as any[]).map((n) => entry(`/news/${n.slug}`, n.updatedAt ?? now))
      )));
      return;
    }

    case 'services-and-technologies': {
      // Fetch layout to get service and ecosystem menu slugs
      const layout = await strapi.db.query('api::layout.layout').findOne({
        populate: {
          serviceMenu: {
            populate: {
              footerLink: true,
              items: { populate: { href: true, child: { populate: { href: true } } } },
            },
          },
          ecosystemMenu: {
            populate: {
              item: { populate: { child: { populate: { href: true } } } },
            },
          },
        },
      }) as any;

      const urls: ReturnType<typeof entry>[] = [];

      // Services
      for (const menu of layout?.serviceMenu ?? []) {
        if (menu?.footerLink?.slug) urls.push(entry(`/${menu.footerLink.slug}`, now));
        for (const item of menu?.items ?? []) {
          if (item?.href?.slug) urls.push(entry(`/${item.href.slug}`, now));
          for (const child of item?.child ?? []) {
            if (child?.href?.slug) urls.push(entry(`/${child.href.slug}`, now));
          }
        }
      }

      // Ecosystem
      for (const eco of layout?.ecosystemMenu ?? []) {
        if (eco?.item?.link) urls.push(entry(eco.item.link, now));
        for (const child of eco?.item?.child ?? []) {
          if (child?.href?.slug) urls.push(entry(`/${child.href.slug}`, now));
        }
      }

      sendXml(ctx, buildUrlSet(dedup(urls)));
      return;
    }

    case 'industries': {
      // Fetch layout to get industries menu slugs
      const layout = await strapi.db.query('api::layout.layout').findOne({
        populate: {
          industriesMenu: {
            populate: {
              sections: { populate: { href: true, items: { populate: { href: true } } } },
            },
          },
        },
      }) as any;

      const urls: ReturnType<typeof entry>[] = [];
      for (const col of layout?.industriesMenu ?? []) {
        for (const section of col?.sections ?? []) {
          if (section?.href?.slug) urls.push(entry(`/${section.href.slug}`, now));
          for (const item of section?.items ?? []) {
            if (item?.href?.slug) urls.push(entry(`/${item.href.slug}`, now));
          }
        }
      }

      sendXml(ctx, buildUrlSet(dedup(urls)));
      return;
    }

    default: {
      const insights = await strapi.db.query('api::insight.insight').findMany({
        where: {
          publishedAt: { $notNull: true },
          $or: [{ isLinkOnly: { $eq: false } }, { isLinkOnly: { $null: true } }],
        },
        select: ['slug', 'updatedAt', 'content'],
        populate: { category: { select: ['slug'] } },
      });

      const urls = (insights as any[]).flatMap((i) => {
        const key = insightTypeKey(i.content, i.category?.slug);
        if (key === '__skip__' || key !== type) return [];
        const prefix = insightPrefix(i.content, i.category?.slug);
        if (!prefix) return [];
        return [entry(`${prefix}/${i.slug}`, i.updatedAt ?? now)];
      });

      if (urls.length === 0) {
        ctx.status = 404;
        ctx.body = `<?xml version="1.0" encoding="UTF-8"?><error>No entries for type: ${type}</error>`;
        return;
      }

      sendXml(ctx, buildUrlSet(dedup(urls)));
    }
  }
}
