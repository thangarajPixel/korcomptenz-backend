/**
 * fabcon-book-meet-lead controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::fabcon-book-meet-lead.fabcon-book-meet-lead',
  ({ strapi }) => ({

    async create(ctx) {
      try {


        const data = ctx.request.body.data;

        const response = await super.create(ctx);
        const leadId = response.data.id;


        const lead = await strapi.entityService.findOne(
          'api::fabcon-book-meet-lead.fabcon-book-meet-lead',
          leadId
        ) as any;

        const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
        const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');

        const fullName = `${lead.firstName || ''} ${lead.lastName || ''}`;


        //  EMAIL TO USER


        // await strapi.plugin('email').service('email').send({
        //   to: lead.email,
        //   bcc: CC_EMAIL,
        //   subject: 'Korcomptenz | Fabcon Meeting Request Received',
        //   html: `
        //   <html>
        //   <body style="font-family:Arial,sans-serif;">
        //     <h3>Hello ${fullName},</h3>
        //     <p>Thank you for booking a meeting with us at FABCON.</p>
        //     <p>Our team will contact you shortly to confirm your time slot.</p>
        //     <br/>
        //     <strong>Regards,</strong><br/>
        //     Korcomptenz Team
        //   </body>
        //   </html>
        //   `,
        // });

        //EMAIL TO ADMIN


        await strapi.plugin('email').service('email').send({
          to: SALES_EMAIL,
          bcc: CC_EMAIL,
          subject: 'New FABCON Meeting Request',
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
      <td
        style="text-align:left;padding:20px 20px 0;font-family:Arial,sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
        New FABCON Booking
      </td>
    </tr>
    <tr>
      <td style="padding:10px 20px;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="150" style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Name:</td>
            <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
               ${fullName}
            </td>
          </tr>
          <tr style="background:#f4f5f7;">
            <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Company:</td>
            <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
              ${lead.company || ''}
            </td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Time Slot:</td>
            <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
              ${lead.timeSlot || ''}
            </td>
          </tr>
          <tr style="background:#f4f5f7;">
            <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Message:</td>
            <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
              ${lead.message || ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px;font-family:Arial,sans-serif;text-align:left;">
        <strong>Sincerely,</strong><br />
        ${fullName}
      </td>
    </tr>
    <tr>
      <td style="padding:10px 20px;background:#040505;color:#FFF;font-family:Arial,sans-serif;">
        Copyrights &copy; 2026. FABCON.com
      </td>
    </tr>
  </table>
</body>
</html>
  `,
        });
        //  Custom response
        return {
          data: {
            success: true,
            id: leadId,
            message: 'Fabcon meeting request created successfully',
          },
        };

      } catch (error: any) {
        console.error(error);
        return ctx.badRequest(error.message || 'Something went wrong');
      }
    },

  })
);
