/**
 * free-consultation-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::free-consultation-lead.free-consultation-lead', () => ({
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

      // console.log("Message sent:", info.messageId);
      return { data: { success: true, ...response.data, message: 'Free Consultation Lead created successfully' } };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
