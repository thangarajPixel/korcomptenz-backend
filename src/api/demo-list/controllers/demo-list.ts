/**
 * demo-list controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs';

export default factories.createCoreController('api::demo-list.demo-list', ({ strapi }) => ({
  async find(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        list: {
          populate: {
            item: true
          },
        },
        seo: true,
      },
    },
      {
        encode: false,
      })

    ctx.query = {
      ...ctx.query,
      ...qs.parse(populateQuery),
    };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    return { data: { ...data }, meta };
  }
}));
