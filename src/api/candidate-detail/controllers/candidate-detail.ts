/**
 * candidate-detail controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::candidate-detail.candidate-detail', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { files } = ctx.request.files || {};

      if (!files) {
        return ctx.badRequest('No file uploaded');
      }

      // Handle single or multiple files
      const fileArray = Array.isArray(files) ? files : [files];

      // Validate that all uploaded files are PDFs
      const invalidFiles = fileArray.filter((file: any) => {
        const mimeType = file.mimetype || file.type; // some environments use mimetype
        return mimeType !== 'application/pdf';
      });

      if (invalidFiles.length > 0) {
        return ctx.badRequest('Only PDF files are allowed');
      }
      const upload = await strapi.plugins.upload.services.upload.upload({
        data: {
          fileInfo: {
            folder: 47
          }
        }, // additional file metadata if needed
        files: ctx.request.files?.files
      });
      const { documentId, ...file } = upload?.[0];
      ctx.request.body.data = { ...ctx.request.body.data, resume: file };
      const response = await super.create(ctx);

      const candidateId = response.data.id;
      const candidate = await strapi.entityService.findOne(
        'api::candidate-detail.candidate-detail',
        candidateId,
        {
          populate: {
            resume: true,
            department: true,
          },
        }
      ) as any;
      // console.log('Candidate Entity:', candidate);
      const departmentName =
        candidate.department?.label || 'N/A';

      const resumeLink = candidate.resume
        ? `<a href="${candidate.resume.url}" target="_blank">
               ${candidate.resume.name}
             </a>`
        : '-';

      // console.log("Department Name:", departmentName);
      // console.log("Resume Link:", resumeLink);
      const HR_EMAIL = strapi.config.get('emails.mail_to_emails.hr');
      const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');

      const info = await strapi.plugin('email').service('email').send({
        // from: '"Korcomptenz" <maddison53@ethereal.email>',
        to: ctx.request.body.data?.email,
        bcc: CC_EMAIL,
        subject: 'Thank you for your Interest',
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
            <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png" alt="" style="width: 250px;"/>
          </a>
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px 20px 0;font-family:'Arial',Sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
          Thank you for your Interest 
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px;font-family:'Arial',Sans-serif;font-weight:400;font-size:14px;line-height:24px;color:#040505;">
          <strong>Dear, ${ctx.request.body.data?.name}</strong><br/><br/>

          Thank You for evincing interest in our company. We do appreciate your time and effort you’ve taken to submit your resume. We are in the process of reviewing multiple applications and will get in touch with you soon concerning your job application. <br/><br/>

          We assure to keep your resume in our repository and reach out to you if your skill sets match our current requirements. Feel free to connect with us if you have any queries. Best wishes for your job search.<br/><br/>

          <strong>Sincerely,</strong><br/>
          KORCOMPTENZ<br/>
          HR Team				
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
      const info2 = await strapi.plugin('email').service('email').send({
        // from: '"Korcomptenz" <maddison53@ethereal.email>',
        to: HR_EMAIL,
        bcc: CC_EMAIL,
        subject: 'Submitted Profile | Korcomptenz',
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
            <img src="https://aue2kormlworkspacetest01.blob.core.windows.net/korcomptenz/full_logo_0fc6f0ad2b.png" alt="" style="width: 250px;" />
          </a>
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px 20px 0;font-family:'Arial',Sans-serif;font-weight:600;font-size:20px;line-height:30px;color:#040505;">
          Submitted Profile | Korcomptenz
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:10px 20px;font-family:'Arial',Sans-serif;font-size:14px;line-height:24px;color:#040505;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="150" style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Name:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${ctx.request.body.data?.name}
              </td>
            </tr>

            <tr style="background-color:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Email:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${ctx.request.body.data?.email}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Phone Number:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${ctx.request.body.data?.phone}
              </td>
            </tr>

            <tr style="background-color:#f4f5f7;">
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Department:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${departmentName}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:500;border-bottom:1px solid #CCC;text-align:left;">Resume:</td>
              <td style="padding:10px;border-bottom:1px solid #CCC;text-align:left;">
                ${resumeLink}
              </td>
            </tr>

           
          </table>
        </td>
      </tr>

      <tr>
        <td style="text-align:left;padding:20px;font-family:'Arial',Sans-serif;font-size:14px;line-height:24px;color:#040505;text-align:left;">
          <strong>Sincerely,</strong><br/>
          ${ctx.request.body.data?.name}
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
      });


      console.log("Message sent:", info.messageId);
      console.log("Message sent:", info2.messageId);

      return { data: { success: true, ...response.data, message: 'Resume uploaded successfully' } };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
