/**
 * sap-lead controller
 */

import { factories } from '@strapi/strapi';

const BASE_URL = (process.env.SITE_URL ?? 'https://www.korcomptenz.com').replace(/\/$/, '');

function stripHtml(html: string): string {
  return String(html ?? '').replace(/<[^>]*>/g, '').trim();
}

/**
 * Resolve formTitle, emailSubject, emailBody and pageUrl from the submitted pageSlug.
 *
 * pageSlug can be:
 *   - "some-slug"                          → page api (no prefix)
 *   - "blog/some-slug"                     → insight with content=blog
 *   - "webinar/some-slug"                  → insight with content=post-webinar|pre-webinar
 *   - "newsroom/some-slug"                 → new-room api
 *   - "case-studies/some-slug"             → case-study api
 */
async function resolvePageData(pageSlug: string): Promise<{
  pageUrl: string;
  formTitle: string;
  emailSubject: string;
  emailBody: string;
}> {
  const defaults = {
    pageUrl: BASE_URL,
    formTitle: 'New SAP Lead',
    emailSubject: 'New SAP Lead | Korcomptenz',
    emailBody: '',
  };

  if (!pageSlug) return defaults;

  const parts = pageSlug.split('/');
  const prefix = parts.length > 1 ? parts[0].toLowerCase() : null;
  const slug = parts[parts.length - 1];

  // ── Page (no prefix) ────────────────────────────────────────────────────────
  if (!prefix) {
    const page = await strapi.db.query('api::page.page').findOne({
      where: { slug: `/${slug}`, publishedAt: { $notNull: true } },
      select: ['slug'],
      populate: {
        list: {
          on: {
            'page-componets.banner-section-list': {
              populate: {
                list: {
                  select: ['formTitle', 'emailSubject', 'emailBody'],
                },
              },
            },
          },
        },
      },
    }) as any;

    if (!page) return defaults;

    const pageUrl = `${BASE_URL}/${page.slug}`.replace(/([^:])\/\/+/g, '$1/');
    let formTitle = defaults.formTitle;
    let emailSubject = defaults.emailSubject;
    let emailBody = defaults.emailBody;

    outer: for (const section of page?.list ?? []) {
      for (const banner of section?.list ?? []) {
        if (banner?.formTitle) formTitle = stripHtml(banner.formTitle) || formTitle;
        if (banner?.emailSubject) emailSubject = stripHtml(banner.emailSubject) || emailSubject;
        if (banner?.emailBody) emailBody = banner.emailBody; // keep HTML for email body
        if (formTitle !== defaults.formTitle) break outer;
      }
    }

    return { pageUrl, formTitle, emailSubject, emailBody };
  }

  // ── Blog ────────────────────────────────────────────────────────────────────
  if (prefix === 'blog') {
    const insight = await strapi.db.query('api::insight.insight').findOne({
      where: { slug, content: 'blog', publishedAt: { $notNull: true } },
      select: ['title', 'slug'],
    }) as any;

    if (!insight) return defaults;
    return {
      pageUrl: `${BASE_URL}/blog/${insight.slug}`,
      formTitle: insight.title ?? defaults.formTitle,
      emailSubject: `${insight.title ?? 'Blog'} | Korcomptenz`,
      emailBody: '',
    };
  }

  // ── Webinar ─────────────────────────────────────────────────────────────────
  if (prefix === 'webinar') {
    const insight = await strapi.db.query('api::insight.insight').findOne({
      where: {
        slug,
        content: { $in: ['post-webinar', 'pre-webinar'] },
        publishedAt: { $notNull: true },
      },
      select: ['title', 'slug'],
    }) as any;

    if (!insight) return defaults;
    return {
      pageUrl: `${BASE_URL}/webinar/${insight.slug}`,
      formTitle: insight.title ?? defaults.formTitle,
      emailSubject: `${insight.title ?? 'Webinar'} | Korcomptenz`,
      emailBody: '',
    };
  }

  // ── Newsroom ─────────────────────────────────────────────────────────────────
  if (prefix === 'newsroom') {
    const newsItem = await strapi.db.query('api::new-room.new-room').findOne({
      where: { slug, publishedAt: { $notNull: true } },
      select: ['title', 'slug'],
    }) as any;

    if (!newsItem) return defaults;
    return {
      pageUrl: `${BASE_URL}/newsroom/${newsItem.slug}`,
      formTitle: newsItem.title ?? defaults.formTitle,
      emailSubject: `${newsItem.title ?? 'Newsroom'} | Korcomptenz`,
      emailBody: '',
    };
  }

  // ── Case Studies ─────────────────────────────────────────────────────────────
  if (prefix === 'case-studies') {
    const caseStudy = await strapi.db.query('api::case-study.case-study').findOne({
      where: { slug, publishedAt: { $notNull: true } },
      select: ['title', 'slug'],
    }) as any;

    if (!caseStudy) return defaults;
    return {
      pageUrl: `${BASE_URL}/case-studies/${caseStudy.slug}`,
      formTitle: caseStudy.title ?? defaults.formTitle,
      emailSubject: `${caseStudy.title ?? 'Case Study'} | Korcomptenz`,
      emailBody: '',
    };
  }

  // ── Unknown prefix — fall back to base URL ───────────────────────────────────
  return {
    ...defaults,
    pageUrl: `${BASE_URL}/${pageSlug}`,
  };
}

export default factories.createCoreController('api::sap-lead.sap-lead', ({ strapi }) => ({
  async create(ctx) {
    try {
      const data = ctx.request.body.data;

      // Save the lead
      await super.create(ctx);

      const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
      const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');

      const { pageUrl, formTitle, emailSubject, emailBody } = await resolvePageData(data?.pageSlug ?? '');

      // ── Email to user ──────────────────────────────────────────────────────
      await strapi.plugin('email').service('email').send({
        to: data?.businessEmail,
        bcc: CC_EMAIL,
        subject: 'Thank you for reaching out – Korcomptenz',
        html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <title>Korcomptenz</title>
    <link rel="shortcut icon" type="image/x-icon" href="https://www.korcomptenz.com/wp-content/uploads/2021/10/favicon.png"/>
    <style type="text/css">
      html { padding: 0; margin: 0; }
      body { padding: 0; margin: 0; text-align: center; }
    </style>
  </head>
  <body>
    <table border="0" width="600" cellpadding="0" cellspacing="0"
      style="border:1px solid #CCC; margin:0 auto;">

      <tr>
        <td style="text-align:center;padding:10px;background:#FFF;font-family:'Arial',Sans-serif;border-bottom:3px solid #249176;">
          <a href="https://www.korcomptenz.com/" target="_blank">
            <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png"
              alt="Korcomptenz" style="width:250px;" />
          </a>
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px 20px 0;font-family:'Arial',Sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
          Thank you for reaching out to Korcomptenz
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px;font-family:'Arial',Sans-serif;font-weight:400;font-size:14px;line-height:24px;color:#040505;">
          <strong>Hi, ${data?.fullName}</strong><br/><br/>

          ${emailBody
            ? emailBody
            : `Thank you for your interest in our solutions. We have received your inquiry and one of our consultants will be in touch with you shortly to schedule a discussion.<br/><br/>
          In the meantime, feel free to explore more of our resources:<br/><br/>
          <a href="https://www.korcomptenz.com/insights/" target="_blank">https://www.korcomptenz.com/insights/</a><br/>
          <a href="https://www.korcomptenz.com/case-studies/" target="_blank">https://www.korcomptenz.com/case-studies/</a>`
          }<br/><br/>

          Thank you for your time and consideration.<br/><br/>

          <strong>Sincerely,</strong><br/>
          KORCOMPTENZ<br/>
          Customer Solutions Team
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:10px 20px;font-family:'Arial',Sans-serif;font-size:14px;line-height:24px;color:#FFF;background:#040505;">
          Copyrights &copy; 2026. Korcomptenz.com
        </td>
      </tr>
    </table>
  </body>
</html>`,
      });

      // ── Email to admin / sales ─────────────────────────────────────────────
      await strapi.plugin('email').service('email').send({
        to: SALES_EMAIL,
        bcc: CC_EMAIL,
        subject: emailSubject,
        html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <title>Korcomptenz</title>
    <link rel="shortcut icon" type="image/x-icon" href="https://www.korcomptenz.com/wp-content/uploads/2021/10/favicon.png"/>
    <style type="text/css">
      html { padding: 0; margin: 0; }
      body { padding: 0; margin: 0; text-align: center; }
    </style>
  </head>
  <body>
    <table border="0" width="600" cellpadding="0" cellspacing="0"
      style="border:1px solid #CCC; margin:0 auto;">

      <tr>
        <td style="text-align:center;padding:10px;background:#FFF;font-family:Arial,sans-serif;border-bottom:3px solid #249176;">
          <a href="https://www.korcomptenz.com/" target="_blank">
            <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png"
              alt="Korcomptenz" style="width:250px;" />
          </a>
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px 20px 0;font-family:Arial,sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
          ${formTitle} – Korcomptenz
        </td>
      </tr>

      <tr>
        <td style="padding:10px 20px 20px;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

            <tr>
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Name</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${data?.fullName || '-'}</td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Email</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${data?.businessEmail || '-'}</td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Phone Number</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${data?.phoneNumber || '-'}</td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Organization</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${data?.organization || '-'}</td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Message</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${data?.message || '-'}</td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Submitted From</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                <a href="${pageUrl}" target="_blank" style="color:#249176;">${pageUrl}</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:10px 20px;background:#040505;color:#FFF;font-family:Arial,sans-serif;font-size:13px;text-align:left;">
          Copyrights &copy; 2026. Korcomptenz.com
        </td>
      </tr>
    </table>
  </body>
</html>`,
      });

      return {
        data: {
          success: true,
          message: 'Thank you for your message. We will get back to you soon.',
        },
      };

    } catch (error) {
      console.error('SAP lead error:', error);
      return ctx.badRequest(error.message || 'Something went wrong');
    }
  },
}));
