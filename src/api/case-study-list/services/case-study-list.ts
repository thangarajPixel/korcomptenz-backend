/**
 * case-study-list service
 */

import { factories } from '@strapi/strapi';
import { Context } from 'vm';
import qs from 'qs';

export default factories.createCoreService('api::case-study-list.case-study-list', ({ strapi }) => ({
  async getPopulate(ctx: Context, isInsightListPage?: boolean) {
    const caseStudyListPopulate = !isInsightListPage ? {
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
    } : {}
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
        seo:true,
        popularFilter: {
          populate: {
            popularFilterList: true,
          },
        },
        ...caseStudyListPopulate,
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
