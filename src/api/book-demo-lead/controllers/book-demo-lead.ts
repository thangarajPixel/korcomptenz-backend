/**
 * book-demo-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::book-demo-lead.book-demo-lead', ({ strapi }) => ({
  async create(ctx) {
    try {
      const data = ctx.request.body.data;
      const response = await super.create(ctx);
      const info = await strapi.plugin('email').service('email').send({
        // from: '"Korcomptenz" <maddison53@ethereal.email>',
        to: data?.email,
        subject: "Demo created successfully",
        text: "Hello world?", // plain‑text body
        html: `
    <b>Thank you for your message. We will get back to you soon.</b>
  `,
      });
      console.log("Message sent:", info.messageId);
      return { data: { success: true, ...response.data, message: 'Demo created successfully' } };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
