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
              'page-componets.faq-title': { populate: true },

              'service.sap-section-data': {
                populate: {
                  imageSection: { populate: true },
                  card: { populate: true },
                },
              },

              'service.banner-section-data': {
                populate: {
                  imageMobile: true,
                  image: true,
                  logo: true,
                  logoMobile: true,
                },
              },

              'service.solutions-data': {
                populate: {
                  image: true,
                  slideContent: { populate: true },
                },
              },

              'service.manuel-slider-data': {
                populate: {
                  slides: { populate: true },
                },
              },

              'service.salesforce-services': {
                populate: {
                  salesforceServices: { populate: true },
                },
              },

              'service.domain-data': {
                populate: {
                  slides: { populate: true },
                },
              },

              'service.benefit-data': {
                populate: {
                  image: true,
                  cards: { populate: true },
                },
              },

              'service.build-data': {
                populate: {
                  image: true,
                  imagemobile: true,
                },
              },
            },
          },
          seo: true,
        }
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
      console.log(slug)
      const customSlug = slug?.join('/');
      if (!customSlug) {
        return ctx.badRequest('Slug parameter is required');
      }

      const entity = await strapi.db.query('api::page.page').findOne({
        where: { slug: slug ? `/${customSlug}` : '/' },
        populate: {
          list: {
            on: {
              'page-componets.faq-title': { populate: true },

              'service.sap-section-data': {
                populate: {
                  imageSection: { populate: true },
                  card: { populate: true },
                },
              },

              'service.banner-section-data': {
                populate: {
                  imageMobile: true,
                  image: true,
                  logo: true,
                  logoMobile: true,
                },
              },

              'service.solutions-data': {
                populate: {
                  image: true,
                  slideContent: { populate: true },
                },
              },

              'service.manuel-slider-data': {
                populate: {
                  slides: { populate: true },
                },
              },

              'service.salesforce-services': {
                populate: {
                  salesforceServices: { populate: true },
                },
              },

              'service.domain-data': {
                populate: {
                  slides: { populate: true },
                },
              },

              'service.benefit-data': {
                populate: {
                  image: true,
                  cards: { populate: true },
                },
              },

              'service.build-data': {
                populate: {
                  image: true,
                  imagemobile: true,
                },
              },
            },
          },
          seo: true,
        }
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