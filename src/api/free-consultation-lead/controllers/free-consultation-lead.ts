/**
 * free-consultation-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::free-consultation-lead.free-consultation-lead', () => ({
  async create(ctx) {
    try {
      // const data = ctx.request.body.data;
      const response = await super.create(ctx);
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
      return { data: { success: true, ...response.data, message: 'Free Consultation Lead created successfully' } };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
