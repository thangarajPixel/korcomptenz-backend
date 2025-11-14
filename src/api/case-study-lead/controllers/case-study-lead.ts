/**
 * case-study-lead controller
 */

import { factories } from '@strapi/strapi'
import { transporter } from '../../../_utils/helper';

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
          const response = await super.create(ctx);
          // const res = await strapi.plugin('email-designer');
          const info = await strapi.plugin('email').service('email').send({
            from: '"Korcomptenz" <maddison53@ethereal.email>',
            to: data.email,
            subject: "Case Study",
            text: "Hello world?", // plain‑text body
            html: "<b>Case Study Details</b>", // HTML body
            attachments: [
              {
                filename: caseStudy?.attachment?.name,
                href: caseStudy?.attachment?.url
              },
            ].filter(value => !!caseStudy?.attachment?.url),
          });

          console.log("Message sent:", info.messageId);
          return { data: { success: true, ...response.data, message: 'Case study lead created successfully', attachment: caseStudy.attachment } };
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
