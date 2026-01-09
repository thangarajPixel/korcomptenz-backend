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
      const info = await strapi.plugin('email').service('email').send({
        // from: '"Korcomptenz" <maddison53@ethereal.email>',
        to: ctx.request.body.data?.email,
        subject: "Thank you for your Interest",
        text: "Hello world?", // plain‑text body
        html: `
     
  <p>Dear <b>${ctx.request.body.data?.name}</b>,</p>

  <p>
    Thank you for evincing interest in our company. We truly appreciate the time
    and effort you have taken to submit your resume.
  </p>

  <p>
    We are currently in the process of reviewing multiple applications and will
    get in touch with you soon regarding your job application.
  </p>

  <p>
    We assure you that your resume will be kept in our repository, and we will
    reach out to you should your skill set match our current requirements.
    Please feel free to connect with us if you have any queries.
  </p>

  <p>
    Best wishes for your job search.
  </p>

  <p>
    Sincerely,<br>
    <b>KORCOMPTENZ</b><br>
    HR Team
  </p>



  `,
      });
      console.log("Message sent:", info.messageId);
      return { data: { success: true, ...response.data, message: 'Resume uploaded successfully' } };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
