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
        entry('/news', now, 'weekly', '0.8'),
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
          entry(`/news/${n.slug}`, n.updatedAt ?? now, 'weekly', '0.7')
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
};
