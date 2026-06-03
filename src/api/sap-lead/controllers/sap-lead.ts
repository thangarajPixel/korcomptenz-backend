/**
 * sap-lead controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::sap-lead.sap-lead', ({ strapi }) => ({
  async create(ctx) {
    try {
      const data = ctx.request.body.data;

      // Save the lead first
      await super.create(ctx);

      const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
      const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');

      // Resolve page slug and formTitle from formPageId via banner-section-data
      let pageUrl = 'https://www.korcomptenz.com';
      let formTitle = 'New SAP Lead';
      if (data?.formPageId) {
        const page = await strapi.db.query('api::page.page').findOne({
          where: { id: data.formPageId },
          populate: {
            list: {
              populate: {
                list: {
                  populate: {
                    pageSlug: {
                      select: ['slug'],
                    },
                  },
                },
              },
            },
          },
        }) as any;

        // Walk the dynamic zone to find banner-section-list → banner-section-data with pageSlug + formTitle
        if (page?.list?.length) {
          for (const section of page.list) {
            const banners = section?.list;
            if (!Array.isArray(banners)) continue;
            for (const banner of banners) {
              if (banner?.pageSlug?.slug) {
                pageUrl = `https://www.korcomptenz.com/${banner.pageSlug.slug}`.replace(/([^:])\/\/+/g, '$1/');
              }
              if (banner?.formTitle) {
                // Strip HTML tags from the CKEditor rich-text value
                formTitle = String(banner.formTitle).replace(/<[^>]*>/g, '').trim() || formTitle;
              }
              if (pageUrl !== 'https://www.korcomptenz.com') break;
            }
            if (pageUrl !== 'https://www.korcomptenz.com') break;
          }
        }
      }

      // ── Email to user ──
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

      <!-- Header -->
      <tr>
        <td style="text-align:center;padding:10px;background:#FFF;font-family:'Arial',Sans-serif;border-bottom:3px solid #249176;">
          <a href="https://www.korcomptenz.com/" target="_blank">
            <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png"
              alt="Korcomptenz" style="width:250px;" />
          </a>
        </td>
      </tr>

      <!-- Heading -->
      <tr>
        <td style="text-align:left;padding:20px 20px 0;font-family:'Arial',Sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
          Thank you for reaching out to Korcomptenz
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="text-align:left;padding:20px;font-family:'Arial',Sans-serif;font-weight:400;font-size:14px;line-height:24px;color:#040505;">
          <strong>Hi, ${data?.fullName}</strong><br/><br/>

          Thank you for your interest in our solutions. We have received your inquiry and one of our consultants will be in touch with you shortly to schedule a discussion.<br/><br/>

          In the meantime, feel free to explore more of our resources:<br/><br/>

          <a href="https://www.korcomptenz.com/insights/" target="_blank">
            https://www.korcomptenz.com/insights/
          </a><br/>
          <a href="https://www.korcomptenz.com/case-studies/" target="_blank">
            https://www.korcomptenz.com/case-studies/
          </a><br/><br/>

          Thank you for your time and consideration.<br/><br/>

          <strong>Sincerely,</strong><br/>
          KORCOMPTENZ<br/>
          Customer Solutions Team
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="text-align:left;padding:10px 20px;font-family:'Arial',Sans-serif;font-size:14px;line-height:24px;color:#FFF;background:#040505;">
          Copyrights &copy; 2026. Korcomptenz.com
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
      });

      // ── Email to admin / sales ──
      await strapi.plugin('email').service('email').send({
        to: SALES_EMAIL,
        bcc: CC_EMAIL,
        subject: `${formTitle} | Korcomptenz`,
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

      <!-- Header -->
      <tr>
        <td style="text-align:center;padding:10px;background:#FFF;font-family:Arial,sans-serif;border-bottom:3px solid #249176;">
          <a href="https://www.korcomptenz.com/" target="_blank">
            <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png"
              alt="Korcomptenz" style="width:250px;" />
          </a>
        </td>
      </tr>

      <!-- Heading -->
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
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${data?.fullName || '-'}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Email</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${data?.businessEmail || '-'}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Phone Number</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${data?.phoneNumber || '-'}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Organization</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${data?.organization || '-'}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Message</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${data?.message || '-'}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:600;border-bottom:1px solid #CCC;text-align:left;">Submitted From</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                <a href="${pageUrl}" target="_blank" style="color:#249176;">
                  ${pageUrl}
                </a>
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:10px 20px;background:#040505;color:#FFF;font-family:Arial,sans-serif;font-size:13px;text-align:left;">
          Copyrights &copy; 2026. Korcomptenz.com
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
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
