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
      populate: { image: true },
      filters: { publishedAt: { $ne: null } },
    });

    // Sort by date desc, fall back to createdAt if date is null
    listData.sort((a: any, b: any) => {
      const aTime = new Date(a.date ?? a.createdAt).getTime();
      const bTime = new Date(b.date ?? b.createdAt).getTime();
      return bTime - aTime;
    });
    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    return { data: { ...data, listData }, meta };
  }
}));
