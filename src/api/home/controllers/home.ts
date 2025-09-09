/**
 * home controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs';
export default factories.createCoreController('api::home.home', ({ strapi }) => ({
  async find(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        WeAreKorcomptenzSection: {
          populate: {
            image: true,
          },
        },
        heroSection: {
          populate: {
            image: true,
          },
        },
        service_sections: {
          populate: {
             image: true,
          },
        },
        card: {
          populate: {
             content:{
              populate:{
                image:true,
              }
             }
          },
        },
        insightSection: {
          populate: {
              content:{
              populate:{
                image:true,
              }
             }
          },
        },
        inspireSection: {
          populate: {
              content:{
              populate:{
                image:true,
              }
             }
          },
        },
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
