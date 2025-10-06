/**
 * case-study controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::case-study.case-study', ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        populate: {
          attachment: false,
          heroSection: {
            populate: {
              image: true,
            },
          },
        },
      };
      const entity = await strapi.service('api::case-study.case-study').find(ctx.query);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error('Case Study find error:', error);
      return ctx.internalServerError('Failed to fetch case study data');
    }
  },
  async findOne(ctx) {
    try {
      const entity = await strapi.db.query('api::case-study.case-study').findOne({
        where: {
          slug: ctx.params.slug,
        },
        populate: {
          attachment: false,
          heroSection: true,
          descriptionSection: true,
          testimonials: true,
        },
      });
      if (!entity) {
        return ctx.notFound('Page not found');
      }
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error('Case Study find error:', error);
      return ctx.internalServerError('Failed to fetch case study data');
    }
  },
}));
