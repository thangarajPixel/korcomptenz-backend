/**
 * insight-category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::insight-category.insight-category',
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          image1: true,
          image2: true,
          image3: true,
        },
      };

      return await super.find(ctx);
    },

    async findOne(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          image1: true,
          image2: true,
          image3: true,
        },
      };

      return await super.findOne(ctx);
    },
  })
);