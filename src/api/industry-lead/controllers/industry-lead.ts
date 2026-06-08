/**
 * industry-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::industry-lead.industry-lead', () => ({
  async create(ctx) {
    try {
      const response = await super.create(ctx);

      const leadId = response.data.id;
      const lead = await strapi.entityService.findOne(
        'api::industry-lead.industry-lead',
        leadId,
        {
          populate: {
            service: true,
          },
        }
      ) as any;

      const serviceName = lead.service?.title || 'N/A';
      const slug = lead.service?.slug || 'N/A';

      const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
      const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');

      // Email to user
      await strapi.plugin('email').service('email').send({
        to: lead.email,
        bcc: CC_EMAIL,
        subject: 'Request a Consultation – Korcomptenz',
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
      html{padding:0;margin:0;}
      body{padding:0;margin:0;text-align:center;}
    </style>
  </head>
  <body>
    <table border="0" width="600" cellpadding="0" cellspacing="0" style="border:1px solid #CCC; margin:0 auto;">
      <tr>
        <td style="text-align:center;padding:10px;background:#FFF;font-family:'Arial',Sans-serif;border-bottom:3px solid #249176;">
          <a href="https://www.korcomptenz.com/" target="_blank">
            <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png" alt="" style="width: 250px;"/>
          </a>
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px 20px 0;font-family:'Arial',Sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
          Request a Service – Korcomptenz
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px;font-family:'Arial',Sans-serif;font-weight:400;font-size:14px;line-height:24px;color:#040505;">
          <strong>Hi, ${lead.firstName} ${lead.lastName}</strong><br/><br/>

          Thank you for your interest in our solutions. We are looking forward to hear from you soon.<br/><br/>

          We wanted to confirm that we have received your inquiry details and one of our consultants will contact you soon to schedule a discussion.<br/><br/>

          Thank you again for your interest.<br/><br/>

          <strong>Sincerely,</strong><br/>
          KORCOMPTENZ<br/>
          Customer Solutions Team
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:10px 20px;font-family:'Arial',Sans-serif;font-weight:400;font-size:14px;line-height:24px;color:#FFF;background:#040505;">
          Copyrights &copy; 2026. Korcomptenz.com
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
      });

      // Email to Admin team
      await strapi.plugin('email').service('email').send({
        to: SALES_EMAIL,
        bcc: CC_EMAIL,
        subject: 'New Industry Lead | Korcomptenz',
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
      html{padding:0;margin:0;}
      body{padding:0;margin:0;text-align:center;}
    </style>
  </head>
  <body>
    <table border="0" width="600" cellpadding="0" cellspacing="0" style="border:1px solid #CCC; margin:0 auto;">
      <tr>
        <td style="text-align:center;padding:10px;background:#FFF;font-family:Arial,sans-serif;border-bottom:3px solid #249176;">
          <a href="https://www.korcomptenz.com/" target="_blank">
            <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png" alt="Korcomptenz" style="width: 250px;"/>
          </a>
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px 20px 0;font-family:Arial,sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
          New Service Lead – Korcomptenz
        </td>
      </tr>

      <tr>
        <td style="padding:10px 20px;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="150" style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Name:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${lead.firstName} ${lead.lastName}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Email:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${lead.email}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Phone Number:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${lead.phone || ''}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Company:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${lead.company || ''}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Service:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${serviceName}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Message:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${lead.message || ''}
              </td>
            </tr>

            // <tr>
            //   <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Submitted From:</td>
            //   <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
            //     <a href="https://www.korcomptenz.com/industries/${slug}"
            //        target="_blank"
            //        style="color:#249176;">
            //       https://www.korcomptenz.com/industries/${slug}
            //     </a>
            //   </td>
            // </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:20px;font-family:Arial,sans-serif;text-align:left;">
          <strong>Sincerely,</strong><br/>
          ${lead.firstName} ${lead.lastName}
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
        `,
      });

      return {
        data: {
          success: true,
          message: 'Thank you for your message. We will get back to you soon.',
        },
      };

    } catch (error) {
      console.error('Industry lead error:', error);
      return ctx.badRequest(error.message || 'Something went wrong');
    }
  },
}));
