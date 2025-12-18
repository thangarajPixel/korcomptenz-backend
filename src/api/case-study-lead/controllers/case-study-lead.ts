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
          }
        });
        if (caseStudy) {
          await super.create(ctx);
          console.log("Case study lead created successfully", caseStudy?.attachment);
          // const res = await strapi.plugin('email-designer');
          const info = await strapi.plugin('email').service('email').send({
            // from: '"Korcomptenz" <maddison53@ethereal.email>',
            to: data?.email,
            subject: "Case Study",
            text: "Hello world?", // plain‑text body
            html: caseStudy?.attachment?.size > 400000 ? `
    <b>Case Study Details</b><br/>
    <p>Please download the case study using the link below:</p>
    <a href="${caseStudy?.attachment?.url}" target="_blank">Download Case Study</a>
  ` : `
    <b>Case Study Details</b>
  `,
            attachments: (!!caseStudy?.attachment?.url && caseStudy?.attachment?.size > 700000) ? [
              {
                filename: caseStudy?.attachment?.name,
                href: caseStudy?.attachment?.url
              },
            ] : undefined,
          });

          console.log("Message sent:", info.messageId);
          return { data: { success: true, message: 'Case study lead created successfully', attachment: caseStudy?.attachment } };
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
