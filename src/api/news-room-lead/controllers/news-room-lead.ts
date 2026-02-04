/**
 * news-room-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::news-room-lead.news-room-lead', ({ strapi }) => ({
  async create(ctx) {
    try {
      const data = ctx.request.body.data;
      if (data.newRoomID) {
        const newRoom = await strapi.db.query('api::new-room.new-room').findOne({
          where: {
            slug: data.newRoomID,
          },
          populate: {
            attachment: true,
          }
        });
        if (newRoom) {
          const newRoomData = {
            connect: [
              {
                id: newRoom.id,
                documentId: newRoom.documentId,
                isTemporary: true,
              },
            ],
          };

          ctx.request.body.data = {
            ...data,
            newRoom: newRoomData,
          };
          const response = await super.create(ctx);
          // const res = await strapi.plugin('email-designer');
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
          return { data: { success: true, ...response.data, message: 'The form has been submitted successfully', attachment: newRoom.attachment } };
        }
        return ctx.notFound('New room not found');
      }
      return ctx.notFound('New room not found');
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
