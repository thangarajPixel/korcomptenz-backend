/**
 * free-consultation-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::free-consultation-lead.free-consultation-lead', () => ({
  async create(ctx) {
    try {
      // const data = ctx.request.body.data;
      // console.log('Free consultation lead payload:', ctx.request.body?.data);
      const lead = ctx.request.body.data;
      // console.log('Lead Details:', lead);

      const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
      const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');
      const response = await super.create(ctx);
      const leadId = response.data.id;

      const documentId = response.data.documentId;

      // 2 Fetch lead with populated insight (Strapi v5 way)
      const detailedLead = await strapi
        .documents('api::free-consultation-lead.free-consultation-lead')
        .findOne({
          documentId,
          populate: {
            insight: true,
          },
        });

      // console.log('Detailed Lead:', detailedLead);
      const insightSlug = detailedLead.insight?.slug || '';
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
          <meta name="description" content="">
          <meta name="keywords" content="">
          <link rel="shortcut icon" type="image/x-icon" href="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png"/>
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
                  <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png" alt="Korcomptenz Logo"style="width: 250px;" />
                </a>
              </td>
            </tr>

            <tr>
              <td style="text-align:left;padding:20px 20px 0;font-family:'Arial',Sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
                Request a Consultation – Korcomptenz 
              </td>
            </tr>

            <tr>
              <td style="text-align:left;padding:20px;font-family:'Arial',Sans-serif;font-weight:400;font-size:14px;line-height:24px;color:#040505;">
                <strong>Hi, ${lead.fullName}</strong><br/><br/>

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
        subject: 'New Contact Us Lead | Korcomptenz',
        html: `
     <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>Korcomptenz</title>
  <link rel="shortcut icon" type="image/x-icon"
    href="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png" />
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
        <a href="https://www.korcomptenz.com/" target="_blank">
          <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png" alt="Korcomptenz Logo" style="width: 250px;" />
        </a>
      </td>
    </tr>
    <tr>
      <td
        style="text-align:left;padding:20px 20px 0;font-family:Arial,sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
        Request a Consultation – Korcomptenz
      </td>
    </tr>
    <tr>
      <td style="padding:10px 20px;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="150" style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Name:</td>
            <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
              ${lead.fullName}
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
            <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Organization:</td>
            <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
              ${lead.organization || ''}
            </td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Message:</td>
            <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
              ${lead.message || ''}
            </td>
          </tr>
            <tr style="background:#f4f5f7;">
          <td style="padding:10px; font-weight:500; border-bottom:1px solid #CCC;text-align:left;">Submitted From:</td>
          <td style="padding:10px; border-bottom:1px solid #CCC;text-align:left;">
            <a href="https://www.korcomptenz.com/blog/${insightSlug}"
               target="_blank"
               style="color:#249176;">
              https://www.korcomptenz.com/blog/${insightSlug}
            </a>
          </td>
        </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px;font-family:Arial,sans-serif;text-align:left;">
        <strong>Sincerely,</strong><br />
        ${lead.fullName}
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
      // console.log("Message sent:", info.messageId);
      return { data: { success: true, ...response.data, message: 'The form has been submitted successfully' } };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
