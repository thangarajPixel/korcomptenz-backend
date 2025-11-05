/**
 * candidate-detail controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::candidate-detail.candidate-detail', ({ strapi }) => ({
  async create(ctx) {
    try {
      const upload = await strapi.plugins.upload.services.upload.upload({
        data: {
        }, // additional file metadata if needed
        files: ctx.request.files?.files,
      });
      const { documentId, ...file } = upload?.[0];
      ctx.request.body.data = { ...ctx.request.body.data, resume: file };
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

      // console.log("Message sent:", info.messageId);
      return { data: { success: true, ...response.data, message: 'Resume uploaded successfully' } };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
