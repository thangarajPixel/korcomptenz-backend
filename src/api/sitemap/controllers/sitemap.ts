import { Context } from 'koa';

const BASE_URL = (process.env.SITE_URL ?? 'https://www.korcomptenz.com').replace(/\/$/, '');
const API_URL = (process.env.PUBLIC_URL ?? BASE_URL).replace(/\/$/, '');

// ── XML helpers

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

// ── URL entry helpers

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

function singularizeSlug(slug: string): string {
  // Keep known irregular/special cases as-is
  if (slug === 'webstories') return slug;
  // Remove trailing 's' for simple plural slugs (e.g. ebooks → ebook, brochures → brochure)
  if (slug.endsWith('s')) return slug.slice(0, -1);
  return slug;
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
    default: return categorySlug ? `/${singularizeSlug(categorySlug)}` : '/insights';
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

// ── Collect all layout menu URLs (services, industries, ecosystem)
async function collectLayoutUrls(now: string): Promise<ReturnType<typeof entry>[]> {
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

  // Industries
  for (const col of layout?.industriesMenu ?? []) {
    for (const section of col?.sections ?? []) {
      if (section?.href?.slug) urls.push(entry(`/${section.href.slug}`, now));
      for (const item of section?.items ?? []) {
        if (item?.href?.slug) urls.push(entry(`/${item.href.slug}`, now));
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

  return urls;
}

// ── Controller

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
        'blogs',
        'podcasts',
        'webinars',
        'webstories',
        'demos',
        'events',
        'newsroom',
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

  // categorized
  async categorized(ctx: Context) {
    try {
      const now = new Date().toISOString();

      const [caseStudies, insights, pages, newsroomItems, eventItems, demoItems] = await Promise.all([
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
        strapi.db.query('api::new-room.new-room').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['title', 'slug', 'updatedAt'],
        }),
        strapi.db.query('api::event.event').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['title', 'buttonLink', 'updatedAt'],
        }),
        strapi.db.query('api::book-demo.book-demo').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['title', 'buttonLink', 'updatedAt'],
        }),
      ]);

      // Build a set of URLs already covered by demos, events, newsroom
      // so we can exclude them from other-pages
      const excludedUrls = new Set<string>();

      // Demos
      const demosSection = {
        title: 'Demos',
        url: `${BASE_URL}/sitemap-demos.xml`,
        lastmod: now,
        children: (demoItems as any[])
          .filter((d) => d.buttonLink)
          .map((d) => {
            const url = `${BASE_URL}/${d.buttonLink.replace(/^\//, '')}`;
            excludedUrls.add(url);
            return { title: d.title, url, lastmod: d.updatedAt ?? now };
          }),
      };

      // Events
      const eventsSection = {
        title: 'Events',
        url: `${BASE_URL}/sitemap-events.xml`,
        lastmod: now,
        children: (eventItems as any[])
          .filter((e) => e.buttonLink)
          .map((e) => {
            const url = `${BASE_URL}/${e.buttonLink.replace(/^\//, '')}`;
            excludedUrls.add(url);
            return { title: e.title, url, lastmod: e.updatedAt ?? now };
          }),
      };

      // Newsroom
      const newsroomSection = {
        title: 'Newsroom',
        url: `${BASE_URL}/sitemap-newsroom.xml`,
        lastmod: now,
        children: (newsroomItems as any[]).map((n) => {
          const url = `${BASE_URL}/newsroom/${n.slug}`;
          excludedUrls.add(url);
          return { title: n.title, url, lastmod: n.updatedAt ?? now };
        }),
      };

      // Case Studies
      const caseStudiesSection = {
        title: 'Casestudies',
        url: `${BASE_URL}/sitemap-casestudies.xml`,
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
      const insightSections = Object.entries(insightGroups).map(([label, items]) => {
        const slug = label.toLowerCase().replace(/\s+/g, '-');
        return { title: label, url: `${BASE_URL}/sitemap-${slug}.xml`, lastmod: now, children: items };
      });

      // Layout URLs (services, industries, ecosystem)
      const layoutUrls = await collectLayoutUrls(now);

      // Static pages always in other-pages
      const staticPages = [
        { title: 'Home', url: `${BASE_URL}/`, lastmod: now },
        { title: 'About Us', url: `${BASE_URL}/about-us`, lastmod: now },
        { title: 'Career', url: `${BASE_URL}/career`, lastmod: now },
        { title: 'Contact Us', url: `${BASE_URL}/contact-us`, lastmod: now },
        { title: 'Insights', url: `${BASE_URL}/insights`, lastmod: now },
        { title: 'Case Studies', url: `${BASE_URL}/case-studies`, lastmod: now },
        { title: 'Events', url: `${BASE_URL}/events`, lastmod: now },
        { title: 'News', url: `${BASE_URL}/news`, lastmod: now },
        { title: 'Book a Demo', url: `${BASE_URL}/book-a-demo`, lastmod: now },
        { title: 'Privacy Policy', url: `${BASE_URL}/privacy-policy`, lastmod: now },
        { title: 'Newsletter', url: `${BASE_URL}/newsletter`, lastmod: now },
      ];

      // Dynamic page entries
      const dynamicPages = (pages as any[]).map((p) => ({
        title: p.pageTitle,
        url: toUrl(BASE_URL, p.slug),
        lastmod: p.updatedAt ?? now,
      }));

      // Layout entries as children objects
      const layoutChildren = layoutUrls.map((u) => ({
        title: u.loc.replace(BASE_URL, ''),
        url: u.loc,
        lastmod: u.lastmod,
      }));

      // Combine all, deduplicate by URL, exclude already-covered sections
      const seenUrls = new Set<string>();
      const otherChildren: { title: string; url: string; lastmod: string }[] = [];

      for (const item of [...staticPages, ...dynamicPages, ...layoutChildren]) {
        const normalized = item.url.replace(/\/$/, '');
        if (seenUrls.has(normalized)) continue;
        if (excludedUrls.has(item.url) || excludedUrls.has(normalized)) continue;
        seenUrls.add(normalized);
        otherChildren.push(item);
      }

      const otherPagesSection = {
        title: 'All the rest of the pages',
        url: `${BASE_URL}/sitemap-other-pages.xml`,
        lastmod: now,
        children: otherChildren,
      };

      return ctx.send({
        baseUrl: BASE_URL,
        sections: [
          caseStudiesSection,
          demosSection,
          eventsSection,
          newsroomSection,
          ...insightSections,
          otherPagesSection,
        ],
      });
    } catch (error) {
      strapi.log.error('Categorized sitemap error:', error);
      return ctx.internalServerError('Failed to generate categorized sitemap');
    }
  },
};

// ── Type handler

async function handleType(ctx: Context, type: string, now: string) {
  switch (type) {
    case 'other-pages':
    case 'pages': {
      // All pages from page collection
      const rows = await strapi.db.query('api::page.page').findMany({
        where: { publishedAt: { $notNull: true } },
        select: ['slug', 'updatedAt'],
      });

      // All layout menu URLs (services, industries, ecosystem)
      const layoutUrls = await collectLayoutUrls(now);

      // URLs already covered by demos/events/newsroom — collect and exclude
      const [demoRows, eventRows, newsroomRows] = await Promise.all([
        strapi.db.query('api::book-demo.book-demo').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['buttonLink'],
        }),
        strapi.db.query('api::event.event').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['buttonLink'],
        }),
        strapi.db.query('api::new-room.new-room').findMany({
          where: { publishedAt: { $notNull: true } },
          select: ['slug'],
        }),
      ]);

      const excludedLocs = new Set<string>([
        ...(demoRows as any[]).filter((d) => d.buttonLink).map((d) => entry(`/${d.buttonLink.replace(/^\//, '')}`, now).loc),
        ...(eventRows as any[]).filter((e) => e.buttonLink).map((e) => entry(`/${e.buttonLink.replace(/^\//, '')}`, now).loc),
        ...(newsroomRows as any[]).map((n) => entry(`/newsroom/${n.slug}`, now).loc),
      ]);

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
        entry('/newsletter', now, 'weekly', '0.8'),
      ];

      const dynamic = (rows as any[]).map((p) =>
        entry(`/${p.slug}`.replace('//', '/'), p.updatedAt ?? now)
      );

      const all = dedup([...staticPages, ...dynamic, ...layoutUrls])
        .filter((u) => !excludedLocs.has(u.loc));

      sendXml(ctx, buildUrlSet(all));
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
        (rows as any[]).map((n) => entry(`/newsroom/${n.slug}`, n.updatedAt ?? now))
      )));
      return;
    }

    case 'demos': {
      const rows = await strapi.db.query('api::book-demo.book-demo').findMany({
        where: { publishedAt: { $notNull: true } },
        select: ['buttonLink', 'updatedAt'],
      });
      sendXml(ctx, buildUrlSet(dedup(
        (rows as any[])
          .filter((d) => d.buttonLink)
          .map((d) => entry(`/${d.buttonLink.replace(/^\//, '')}`, d.updatedAt ?? now))
      )));
      return;
    }

    case 'events': {
      const rows = await strapi.db.query('api::event.event').findMany({
        where: { publishedAt: { $notNull: true } },
        select: ['buttonLink', 'updatedAt'],
      });
      sendXml(ctx, buildUrlSet(dedup(
        (rows as any[])
          .filter((e) => e.buttonLink)
          .map((e) => entry(`/${e.buttonLink.replace(/^\//, '')}`, e.updatedAt ?? now))
      )));
      return;
    }

    case 'newsroom': {
      const rows = await strapi.db.query('api::new-room.new-room').findMany({
        where: { publishedAt: { $notNull: true } },
        select: ['slug', 'updatedAt'],
      });
      sendXml(ctx, buildUrlSet(dedup(
        (rows as any[]).map((n) => entry(`/newsroom/${n.slug}`, n.updatedAt ?? now))
      )));
      return;
    }

    case 'newsletter': {
      // Newsletter pages are now included in other-pages sitemap
      sendXml(ctx, buildUrlSet([]));
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