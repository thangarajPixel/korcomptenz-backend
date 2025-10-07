/**
 * case-study controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::case-study.case-study', ({ strapi }) => ({
  async find(ctx) {
    try {
      // Get simple frontend filters, e.g. ?technologies=2,4&services=3
      const { technologies, services, regions, industries }: { technologies?: string, services?: string, regions?: string, industries?: string } = ctx.query;

      // Build filters dynamically
      const filters: { technologies?: { id: { $in: number[] } }, services?: { id: { $in: number[] } }, regions?: { id: { $in: number[] } }, case_industries?: { id: { $in: number[] } } } = {};

      if (technologies) {
        const techIds = technologies.split(',').map(Number);
        filters.technologies = { id: { $in: techIds } };
      }

      if (services) {
        const serviceIds = services.split(',').map(Number);
        filters.services = { id: { $in: serviceIds } };
      }

      if (regions) {
        const regionIds = regions.split(',').map(Number);
        filters.regions = { id: { $in: regionIds } };
      }

      if (industries) {
        const industryIds = industries.split(',').map(Number);
        filters.case_industries = { id: { $in: industryIds } };
      }
      ctx.query = {
        ...ctx.query,
        populate: {
          attachment: false,
          heroSection: {
            populate: {
              image: true,
            },
          },
          outcome: true,
          case_industries: true,
          regions: true,
          services: true,
          technologies: true,
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
  async findFilter(ctx) {
    try {
      const [businessOutcomes, industries, region, service, technology] =
        await Promise.all([
          strapi.db.query('api::case-business-outcome.case-business-outcome').findMany(),
          strapi.db.query('api::case-industry.case-industry').findMany(),
          strapi.db.query('api::case-region.case-region').findMany(),
          strapi.db.query('api::case-service.case-service').findMany(),
          strapi.db.query('api::case-technology.case-technology').findMany({
            populate: {
              image: true,
            },
          }),
        ]);

      const entity = {
        businessOutcomes,
        industries,
        region,
        service,
        technology,
      };
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error('Case Study filter error:', error);
      return ctx.internalServerError('Failed to fetch case study data');
    }
  },
}));
