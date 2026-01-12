/**
 * contact-us-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::contact-us-lead.contact-us-lead', () => ({
  async create(ctx) {
    try {
      // const data = ctx.request.body.data;
      const response = await super.create(ctx);
      // const info = await transporter.sendMail({
      //   from: '"Korcomptenz" <maddison53@ethereal.email>',
      //   to: data.email,
      //   subject: "Case Study",
      //   text: "Hello world?", // plain‑text body
      //   html: "<b>Case Study Details</b>", // HTML body
      //   attachments: [
      //     {
      //       filename: caseStudy?.attachment?.name,
      //       href: caseStudy?.attachment?.url
      //     },
      //   ].filter(value => !!caseStudy?.attachment?.url),
      // });

      const leadId = response.data.id;
      const lead = await strapi.entityService.findOne(
        'api::contact-us-lead.contact-us-lead',
        leadId,
        {
          populate: {
            technology: true,
            service: true,
          },
        }
      ) as any;

      const technologyName = lead.technology?.label || lead.technology?.name || 'N/A';
      const serviceName = lead.service?.label || lead.service?.name || 'N/A';
      // console.log('Contact Us Lead Entity:', lead);
      // console.log('Service Name:', serviceName);
      // console.log('Technology Name:', technologyName);

      // Email to user

      await strapi.plugin('email').service('email').send({
        to: lead.email,
        cc: "manikandan@pixel-studios.com",
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
          Request a Consultation – Korcomptenz 
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
        // to: 'sales@korcomptenz.com',
        subject: 'New Contact Us Lead | Korcomptenz',
        cc: "manikandan@pixel-studios.com",
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
            <img src="https://www.korcomptenz.com/wp-content/uploads/2021/10/logo.png" alt="Korcomptenz"/>
          </a>
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px 20px 0;font-family:Arial,sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
          Request a Consultation – Korcomptenz
        </td>
      </tr>

      <tr>
        <td style="padding:10px 20px;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="150" style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Name:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.firstName} ${lead.lastName}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Email:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.email}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Organization:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.organization || ''}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Phone Number:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.phone || ''}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Location:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.location || ''}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Services:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.services || ''}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Technology:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.technology || ''}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Industry:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.industry || ''}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Message:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.message || ''}
              </td>
            </tr>

            <tr style="background:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;">Page URL:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;">
                ${lead.pageUrl || ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:20px;font-family:Arial,sans-serif;">
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
      console.error('Contact lead error:', error);
      return ctx.badRequest(error.message || 'Something went wrong');
    }
  },

})
);
