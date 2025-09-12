/**
 * page controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs';


// export default factories.createCoreController('api::page.page',({ strapi }) => ({
//   async find(ctx) {
//     const populateQuery = qs.stringify({
//       populate: {
//         // list: {
//         //   populate: {
//         //     image: true,
//         //   },
        
//         // },
//     //    service_sections: {
//     //       populate: {
//     //          image: true,
//     //       },
//     //     },
//       },
//     }, {
//       encode: false,
//     })

//     ctx.query = {
//       ...ctx.query,
//       ...qs.parse(populateQuery),
//     };

//     // Calling the default core action
//     const { data, meta } = await super.find(ctx);
//     return { data: { ...data }, meta };
//   }
// }));




export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        populate: {
          list: {
            on: {
              'seo.we-are-korcomptenz-section': {
                populate: {image: true},   
              },
              'global.global-field': { populate: true },
            },
          },
          service_sections: {
           populate: {image: true},
          },
        },
      };

      const { results, pagination } = await strapi.service('api::page.page').find(ctx.query);

      // if you want just one page
      return { data: results, meta: { pagination } };
    } catch (error) {
      strapi.log.error('Page find error:', error);
      return ctx.internalServerError('Failed to fetch page data');
    }
  },
}));