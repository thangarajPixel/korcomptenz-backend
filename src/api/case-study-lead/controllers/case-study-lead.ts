/**
 * case-study-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::case-study-lead.case-study-lead', ({ strapi }) => ({
  async create(ctx) {
    try {
      const data = ctx.request.body.data;
      if (data.caseStudyId) {
        const caseStudy = await strapi.db.query('api::case-study.case-study').findOne({
          where: {
            id: data.caseStudyId,
          },
          populate: {
            attachment: true,
            slug: true,
            document_Id: true
          }
        });

        if (caseStudy) {
          await super.create(ctx);
          console.log("The form has been submitted successfully", caseStudy?.attachment);
          // const res = await strapi.plugin('email-designer');

          const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
          const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');
          // console.log('CC_EMAIL:', CC_EMAIL);
          // console.log('SALES_EMAIL:', SALES_EMAIL);

          const info = await strapi.plugin('email').service('email').send({
            to: data?.email,
            cc: CC_EMAIL,
            subject: 'Thank you for your interest in our Case Study',
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
            <img src="https://www.korcomptenz.com/wp-content/uploads/2021/10/logo.png" alt="" />
          </a>
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px 20px 0;font-family:'Arial',Sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
          Thank you for your interest in our Case Study
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px;font-family:'Arial',Sans-serif;font-weight:400;font-size:14px;line-height:24px;color:#040505;">
          <strong>Hi, ${data?.fullName}</strong><br/><br/>

          Thank you for your interest in our solutions. In addition to that case study, here are some other resources we believe may be useful to you. Kindly click on the below link to find those,<br/><br/>

          ${caseStudy?.attachment?.size > 400000
                ? `<a href="${caseStudy?.attachment?.url}" target="_blank">${caseStudy?.attachment?.url}</a><br/><br/>`
                : ''
              }

          <a href="https://www.korcomptenz.com/case-studies/" target="_blank">
            https://www.korcomptenz.com/case-studies/
          </a><br/>
          <a href="https://www.korcomptenz.com/insights/" target="_blank">
            https://www.korcomptenz.com/insights/
          </a><br/><br/>

          Thank you for your time and your consideration.<br/><br/>

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
</html>
`,
            attachments:
              caseStudy?.attachment?.url && caseStudy?.attachment?.size > 700000
                ? [
                  {
                    filename: caseStudy?.attachment?.name,
                    href: caseStudy?.attachment?.url,
                  },
                ]
                : undefined,
          });

          const info2 = await strapi.plugin('email').service('email').send({
            to: SALES_EMAIL,
            cc: CC_EMAIL,
            subject: "Case Study Download",
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
  style="border:1px solid #CCC; font-family: Arial, sans-serif;">

  <!-- Header -->
  <tr>
    <td style="text-align:center; padding:15px; border-bottom:3px solid #249176;">
      <a href="https://www.korcomptenz.com/" target="_blank">
        <img src="https://www.korcomptenz.com/wp-content/uploads/2021/10/logo.png"
             alt="Korcomptenz" style="max-width:180px;" />
      </a>
    </td>
  </tr>

  <!-- Title -->
  <tr>
    <td style="padding:20px; font-size:20px; font-weight:600; color:#040505; text-align:left;">
      Case Study Download Form
    </td>
  </tr>

  <!-- Details Table -->
  <tr>
    <td style="padding:0 20px 20px 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

        <tr>
          <td style="padding:10px; font-weight:600; border-bottom:1px solid #CCC;">Name</td>
          <td style="padding:10px; border-bottom:1px solid #CCC;">
            ${data?.fullName || "-"}
          </td>
        </tr>

        <tr style="background:#f4f5f7;">
          <td style="padding:10px; font-weight:600; border-bottom:1px solid #CCC;">Email</td>
          <td style="padding:10px; border-bottom:1px solid #CCC;">
            ${data?.email || "-"}
          </td>
        </tr>

        <tr>
          <td style="padding:10px; font-weight:600; border-bottom:1px solid #CCC;">Organization</td>
          <td style="padding:10px; border-bottom:1px solid #CCC;">
            ${data?.organization || "-"}
          </td>
        </tr>

        <tr style="background:#f4f5f7;">
          <td style="padding:10px; font-weight:600; border-bottom:1px solid #CCC;">Phone Number</td>
          <td style="padding:10px; border-bottom:1px solid #CCC;">
            ${data?.phone || "-"}
          </td>
        </tr>

        <tr>
          <td style="padding:10px; font-weight:600; border-bottom:1px solid #CCC;">Message</td>
          <td style="padding:10px; border-bottom:1px solid #CCC;">
            ${data?.message || "-"}
          </td>
        </tr>

        <tr style="background:#f4f5f7;">
          <td style="padding:10px; font-weight:600; border-bottom:1px solid #CCC;">Page URL</td>
          <td style="padding:10px; border-bottom:1px solid #CCC;">
            <a href="https://www.korcomptenz.com/case-studies/${caseStudy?.slug}"
               target="_blank"
               style="color:#249176;">
              https://www.korcomptenz.com/case-studies/${caseStudy?.slug}
            </a>
          </td>
        </tr>

      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="padding:15px; background:#040505; color:#ffffff; font-size:13px; text-align:left;">
      © 2026 Korcomptenz.com
    </td>
  </tr>

</table>

</body>
</html>
  `,
          });



          console.log("Message sent:", info.messageId);
          console.log("Message sent:", info2.messageId);
          return { data: { success: true, message: 'The form has been submitted successfully', attachment: caseStudy?.attachment } };
        }
        return ctx.notFound('Case study not found');
      }
      return ctx.notFound('Case study not found');
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
