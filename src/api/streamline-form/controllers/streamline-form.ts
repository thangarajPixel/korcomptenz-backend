/**
 * streamline-form controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::streamline-form.streamline-form',

  ({ strapi }) => ({

    async create(ctx) {
      try {


        const data = ctx.request.body.data;

        const response = await super.create(ctx);
        const leadId = response.data.id;


        const lead = await strapi.entityService.findOne(
          'api::streamline-form.streamline-form',
          leadId
        ) as any;
        console.log("The form has been submitted successfully", lead);

        const formLabelsData = await strapi.entityService.findMany(
          'api::streamline-form-label.streamline-form-label',
          {
            filters: { active: 'true' },
            populate: {
              formLabel: {
                on: {
                  'form-fields.streamline-form': true
                }
              }
            }
          }
        ) as any[];
        console.log("Active form label data:", JSON.stringify(formLabelsData, null, 2));

        // Extract labels from nested structure
        const formLabels = formLabelsData?.[0]?.formLabel?.[0] || {};
        console.log("Extracted form labels:", formLabels);


        const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
        const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');


        const emailHtmlupdate = `
           <table border="0" width="600" cellpadding="0" cellspacing="0" style="border:1px solid #CCC; margin:0 auto;">
    <tr>
      <td width="150" style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">${formLabels?.nameLabel || 'Name'}:</td>
      <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${lead.name || ''}</td>
    </tr>
    <tr >
      <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">${formLabels?.emailLabel || 'Email'}:</td>
      <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${lead.email || ''}</td>
    </tr>
    <tr>
      <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">${formLabels?.designationLabel || 'Designation'}:</td>
      <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${lead.designation || ''}</td>
    </tr>
    <tr >
      <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">${formLabels?.question1Label || ''}:</td>
      <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${lead.streamlineOperation || ''}</td>
    </tr>
    <tr>
      <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">${formLabels?.question2Label || ''}:</td>
      <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">${lead.stayCompetitive || ''}</td>
    </tr>
   
  </table>
`;

        //  EMAIL TO ADMIN
        const emailHtml = `
          <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
          <title>FABCON</title>
          <link rel="shortcut icon" type="image/x-icon"
            href="https://your-cdn.blob.core.windows.net/fabcon/fabcon_logo.png" />
          <style type="text/css">
            html {
              padding: 0;
              margin: 0;
            }
            body {
              padding: 0;
              margin: 0;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <table border="0" width="600" cellpadding="0" cellspacing="0" style="border:1px solid #CCC; margin:0 auto;">
            <tr>
              <td
                style="text-align:center;padding:10px;background:#FFF;font-family:Arial,sans-serif;border-bottom:3px solid #249176;">
                <a href="https://www.fabcon.com/" target="_blank">
                  <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png" alt="FABCON Logo" style="width: 250px;" />
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 20px;font-family:Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="150" style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Name:</td>
                    <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                       ${lead.name}
                    </td>
                  </tr>
                  <tr style="background:#f4f5f7;">
                    <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Email:</td>
                    <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                      ${lead.email || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Designation:</td>
                    <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                      ${lead.designation || ''}
                    </td>
                  </tr>
                  <tr style="background:#f4f5f7;">
                    <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">  ${formLabels?.question1Label || ''}:</td>
                    <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                      ${lead.streamlineOperation || ''}
                    </td>
                  </tr>
                  <tr >
                    <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;"> ${formLabels?.question2Label || ''}:</td>
                    <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                      ${lead.stayCompetitive || ''}
                    </td>
                  </tr>

                  
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;font-family:Arial,sans-serif;text-align:left;">
                <strong>Sincerely,</strong><br />
                ${lead.name}
              </td>
            </tr>
            <tr>
              <td style="padding:10px 20px;background:#040505;color:#FFF;font-family:Arial,sans-serif;">
                  Copyrights &copy; 2026. Korcomptenz.com
              </td>
            </tr>
          </table>
        </body>
        </html>
        `;

        await strapi.plugin('email').service('email').send({
          to: SALES_EMAIL,
          bcc: CC_EMAIL,
          subject: 'New Streamline Form Submission',
          html: emailHtml,
        });


        await strapi.entityService.update(
          'api::streamline-form.streamline-form',
          leadId,
          {
            data: {
              description: emailHtmlupdate,
            }
          }
        );
        console.log("Description updated with email HTML for lead:", leadId);
        //  Custom response
        return {
          data: {
            success: true,
            id: leadId,
            message: 'The form has been submitted successfully',
          },
        };

      } catch (error: any) {
        console.error(error);
        return ctx.badRequest(error.message || 'Something went wrong');
      }
    },

  })
);