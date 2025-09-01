/**
 * layout controller
 */

import { factories } from '@strapi/strapi';

interface PopulateQuery {
  [key: string]: any;
}

export default factories.createCoreController('api::layout.layout', ({ strapi }) => ({
  async find(ctx) {
    // Default populate for the layout
    const populate = {
      footer: {
        populate: {
          image: true,
          mobile_image: true,
        },
      },
    };

    // Merge with any existing populate from query
    const existingPopulate = (ctx.query.populate || {}) as PopulateQuery;
    const populateQuery = { ...populate, ...existingPopulate };

    ctx.query = {
      ...ctx.query,
      populate: populateQuery,
    };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
})
);
