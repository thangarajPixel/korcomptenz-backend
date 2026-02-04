/**
 * book-demo-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::book-demo-lead.book-demo-lead', ({ strapi }) => ({
  async create(ctx) {
    try {
      const data = ctx.request.body.data;
      const response = await super.create(ctx);
      const leadId = response.data.id;

      // fetch with populate
      const lead = await strapi.entityService.findOne(
        'api::book-demo-lead.book-demo-lead',
        leadId,
        {
          populate: {
            demoFrom: true,
          },
        }
      ) as any;
      const demoFromName =
        lead.demoFrom?.title ||
        'N/A';
      const slug =
        lead.demoFrom?.buttonLink ||
        'N/A';

      // console.log('Demo From Name:', demoFromName);
      // console.log('Lead Details:', lead);
      const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
      const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');
      // console.log('CC_EMAIL:', CC_EMAIL);
      // console.log('SALES_EMAIL:', SALES_EMAIL);

      // email to user
      await strapi.plugin('email').service('email').send({
        to: lead.email,
        cc: CC_EMAIL,
        subject: 'Korcomptenz | Thank you for your enquiry',
        html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Korcomptenz</title>
      </head>

      <body style="margin:0; padding:0; background:#ffffff; text-align:center;">

      <table width="600" cellpadding="0" cellspacing="0" align="center"
        style="border:1px solid #CCC; font-family: Arial, sans-serif; background:#ffffff;">

        <!-- Header -->
        <tr>
          <td style="text-align:center; padding:12px; border-bottom:3px solid #249176;">
            <a href="https://www.korcomptenz.com/" target="_blank">
              <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png"
                   alt="Korcomptenz"
                   style="max-width:180px; display:block; margin:0 auto;" />
            </a>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:20px 20px 0 20px; font-size:20px; font-weight:600; color:#040505; text-align:left;">
            Korcomptenz | Thank you for your enquiry
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:20px; font-size:14px; line-height:24px; color:#040505; text-align:left;">
            <strong>Hi ${lead.name},</strong><br/><br/>

            Thank you for your interest in our solutions.<br/><br/>

            We wanted to confirm that we have received your inquiry details, and one of our consultants will contact you shortly to schedule a discussion.<br/><br/>

            Thank you again for your interest. We look forward to speaking with you.<br/><br/>

            <strong>Sincerely,</strong><br/>
            <strong>KORCOMPTENZ</strong><br/>
            Customer Solutions Team
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:10px 20px; background:#040505; color:#ffffff; font-size:13px; text-align:left;">
            © 2026 Korcomptenz.com
          </td>
        </tr>

      </table>

      </body>
      </html>
        `,
      });

      // email to admin
      await strapi.plugin('email').service('email').send({
        to: SALES_EMAIL,
        cc: CC_EMAIL,
        subject: 'Korcomptenz | Online Enquiry',
        html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Korcomptenz</title>
      </head>

      <body style="margin:0; padding:0; text-align:center; background:#ffffff;">

      <table width="600" cellpadding="0" cellspacing="0" align="center"
        style="border:1px solid #CCC; font-family:Arial, sans-serif; background:#ffffff;">

        <!-- Header -->
        <tr>
          <td style="text-align:center; padding:10px; border-bottom:3px solid #249176;">
            <a href="https://www.korcomptenz.com/" target="_blank">
              <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png"
                   alt="Korcomptenz"
                   style="max-width:180px; display:block; margin:0 auto;" />
            </a>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:20px 20px 0; font-size:20px; font-weight:600; color:#040505; text-align:left;">
            Common Form
          </td>
        </tr>

        <!-- Table Content -->
        <tr>
          <td style="padding:10px 20px; text-align:left;">
            <table width="100%" cellpadding="0" cellspacing="0">

              <tr>
                <td width="150" style="padding:10px; font-weight:500; border-bottom:1px solid #CCC;text-align:left;">
                  Name:
                </td>
                <td style="padding:10px; border-bottom:1px solid #CCC;text-align:left;">
                  ${lead.name}
                </td>
              </tr>

              <tr style="background:#f4f5f7;">
                <td style="padding:10px; font-weight:500; border-bottom:1px solid #CCC;text-align:left;">
                  Email:
                </td>
                <td style="padding:10px; border-bottom:1px solid #CCC;text-align:left;">
                  ${lead.email}
                </td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:500; border-bottom:1px solid #CCC;text-align:left;">
                  Organization:
                </td>
                <td style="padding:10px; border-bottom:1px solid #CCC;text-align:left;">
                  ${lead.organization}
                </td>
              </tr>

              <tr style="background:#f4f5f7;">
                <td style="padding:10px; font-weight:500; border-bottom:1px solid #CCC; text-align:left;">
                  Demo From:
                </td>
                <td style="padding:10px; border-bottom:1px solid #CCC;text-align:left;">
                  ${demoFromName}
                </td>
              </tr>
               <tr style="background-color:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Page URL:</td>
               <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                <a href="https://www.korcomptenz.com${slug}" target="_blank">
                  https://www.korcomptenz.com${slug}
                </a>
              </td>

            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px; text-align:left; font-size:14px; color:#040505;text-align:left;">
            <strong>Sincerely,</strong><br/>
             ${lead.name}
          </td>
        </tr>

        <tr>
          <td style="padding:10px 20px; background:#040505; color:#ffffff; font-size:13px; text-align:left;">
            © 2026 Korcomptenz.com
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
          message: 'Demo created successfully',
        },
      };

    } catch (error) {
      console.error(error);
      return ctx.badRequest(error.message || 'Something went wrong');
    }
  },

})
);
