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

      const info = await strapi.plugin('email').service('email').send({
        // from: '"Korcomptenz" <maddison53@ethereal.email>',
        to: ctx.request.body.data?.email,
        subject: "Thank you for your message.",
        text: "Hello world?", // plain‑text body
        html: `
    <b>Thank you for your message.</b>
  `,
      });
      console.log("Message sent:", info.messageId);
      return { data: { success: true, ...response.data, message: 'Thank you for your message. We will get back to you soon.' } };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
