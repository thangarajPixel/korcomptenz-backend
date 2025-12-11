/**
 * event-list controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs'
export default factories.createCoreController('api::event-list.event-list', ({ strapi }) => ({
  async find(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        list: {
          on: {
            'demo-page.demo-banner-list': {
              populate: {
                list: {
                  populate: {
                    imageMobile: true,
                    image: true,
                    logo: true,
                    logoMobile: true,
                  }
                },
              }
            },
          }
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
    const listData = await strapi.db.query('api::event.event').findMany({
      populate: {
        image: true,
      },
    });
    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    return { data: { ...data, listData }, meta };
  }
}));
