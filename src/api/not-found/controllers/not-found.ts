/**
 * not-found controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs'
export default factories.createCoreController('api::not-found.not-found', ({ strapi }) => ({
  async find(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        list: {
          on: {
            '"not-found.not-found"': {
              populate: {
                image: true,
              },
            },
          }
        }
      },
    }, {
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
