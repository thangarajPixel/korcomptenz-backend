/**
 * forrester-report controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::forrester-report.forrester-report',
  ({ strapi }) => ({

    async create(ctx) {
      try {

        const data = ctx.request.body.data;

        const response = await super.create(ctx);
        const leadId = response.data.id;

        // console.log('Forrester report lead payload:', data);
        const lead = await strapi.entityService.findOne(
          'api::forrester-report.forrester-report',
          leadId
        ) as any;


        if (data.blogId) {
          // console.log('Blog ID:', data.blogId);
          const blog = await strapi.db.query('api::insight.insight').findOne({
            where: {
              documentId: data.blogId,
            },
            populate: {
              attachment: true,
              slug: true,
              document_Id: true
            }
          });

          // console.log("The form has been submitted successfully", blog?.attachment);


          const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
          const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');



          //EMAIL TO ADMIN


          await strapi.plugin('email').service('email').send({
            to: SALES_EMAIL,
            bcc: CC_EMAIL,
            subject: 'Forrester Report',
            html: `
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
            <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Company:</td>
            <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
              ${lead.organization || ''}
            </td>
          </tr>

        <tr style="background:#f4f5f7;">
          <td style="padding:10px; font-weight:600; border-bottom:1px solid #CCC;text-align:left;">Page URL</td>
          <td style="padding:10px; border-bottom:1px solid #CCC;text-align:left;">
            <a href="https://www.korcomptenz.com/blog/${blog?.slug}"
               target="_blank"
               style="color:#249176;">
              https://www.korcomptenz.com/blog/${blog?.slug}
            </a>
          </td>
        </tr>
         </table>  
    <tr>
      <td style="padding:20px;font-family:Arial,sans-serif;text-align:left;">
        <strong>Sincerely,</strong><br />
        ${lead.name}
      </td>
    </tr>
     
            <tr>
              <td style="padding:10px 20px;background:#040505;color:#FFF;font-family:Arial,sans-serif;width:140%;">
                Copyrights &copy; 2026. Korcomptenz.com
              </td>
            </tr>

</body>
</html>
  `,
          });

          //  Custom response
          return {
            data: {
              success: true,
              id: leadId,
              message: 'The form has been submitted successfully, ',
              attachment: blog?.attachment
            },
          };
        }
        return ctx.notFound('Blog not found');

      } catch (error: any) {
        console.error(error);
        return ctx.badRequest(error.message || 'Something went wrong');
      }
    },

  })
);
