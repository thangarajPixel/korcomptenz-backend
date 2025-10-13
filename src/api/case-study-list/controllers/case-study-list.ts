/**
 * case-study-list controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs';

export default factories.createCoreController('api::case-study-list.case-study-list', {
  async find(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        banner: {
          populate: {
            images: {
              populate: {
                image: true,
              },
            },
          },
        },
        filterLabel: true,
        popularFilter: {
          populate: {
            popularFilterList: true,
          },
        },
        sponser: {
          populate: {
            image: true,
            logo: true,
          },
        },
        partnerSection: {
          populate: {
            partner: {
              populate: {
                logo: true,
              },
            },
          },
        },
        customerSection: {
          populate: {
            customerValues: true,
          },
        },
        testimonal: true,
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
  },
});
