/**
 * page controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs';



export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        populate: {
          list: {
            on: {
              'seo.we-are-korcomptenz-section': {
                populate: { image: true },
              },
              'global.global-field': { populate: true },
              'home.banner': {
                populate: {
                  content: {   
                    populate: true, 
                  },
                },
              },
              'home.inspire-banner': {
                populate: {
                  content: {   
                    populate: true, 
                  },
                },
              },
               'home.service-banner': {
                populate: {
                  content: {   
                    populate: true, 
                  },
                },
              },
            },
          },
          // service_sections: {
          //  populate: {image: true},
          // },
        },
      };

      const { results, pagination } = await strapi.service('api::page.page').find(ctx.query);

      return { data: results, meta: { pagination } };
    } catch (error) {
      strapi.log.error('Page find error:', error);
      return ctx.internalServerError('Failed to fetch page data');
    }
  },
}));