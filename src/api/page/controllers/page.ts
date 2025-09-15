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
  async findOneBySlug(ctx) {
    try {
      const { slug } = ctx.query as { slug: string[] };
      const customSlug = slug?.join('/');
      if (!customSlug) {
        return ctx.badRequest('Slug parameter is required');
      }

      const entity = await strapi.db.query('api::page.page').findOne({
        where: { slug: slug ? `/${customSlug}` : '/' },
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
        },
      });

      if (!entity) {
        return ctx.notFound('Page not found');
      }
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching the page');
    }
  },
}));