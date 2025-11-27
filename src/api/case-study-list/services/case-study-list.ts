/**
 * case-study-list service
 */

import { factories } from '@strapi/strapi';
import { Context } from 'vm';
import qs from 'qs';

export default factories.createCoreService('api::case-study-list.case-study-list', ({ strapi }) => ({
  async getPopulate(ctx: Context) {
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
        // sponser: {
        //   populate: {
        //     image: true,
        //     logo: true,
        //   },
        // },
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

    return ctx;
  }
}));
