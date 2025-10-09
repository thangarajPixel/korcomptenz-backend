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
          publishedAt: { $notNull: true },
        },
        populate: {
          attachment: false,
          heroSection: {
            populate: {
              image: true
            }
          },
          descriptionSection: true,
          testimonials: true,
        },
      });
      if (!entity) {
        return ctx.notFound('Page not found');
      }

      // // Extract related field IDs
      // const techIds = entity.technologies?.map(t => t.id) || [];
      // const serviceIds = entity.services?.map(s => s.id) || [];
      // const regionIds = entity.regions?.map(r => r.id) || [];
      // const industryIds = entity.case_industries?.map(i => i.id) || [];
      // Find related case studies
      // const related = await strapi.db.query('api::case-study.case-study').findMany({
      //   where: {
      //     id: { $ne: entity.id }, // exclude current one
      //     publishedAt: { $notNull: true },
      //     $or: [
      //       techIds.length ? { technologies: { id: { $in: techIds } } } : {},
      //       serviceIds.length ? { services: { id: { $in: serviceIds } } } : {},
      //       regionIds.length ? { regions: { id: { $in: regionIds } } } : {},
      //       industryIds.length ? { case_industries: { id: { $in: industryIds } } } : {},
      //     ].filter(o => Object.keys(o).length), // remove empty filters
      //   },
      //   populate: {
      //     heroSection: { populate: { image: true } },
      //   },
      //   limit: 3,
      //   orderBy: { publishedAt: 'desc' },
      // });
      // // Sanitize responses
      // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      // const sanitizedRelated = await this.sanitizeOutput(related, ctx);
      // return this.transformResponse({
      //   caseStudy: sanitizedEntity,
      //   relatedCaseStudies: sanitizedRelated,
      // });
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
          strapi.db.query('api::case-business-outcome.case-business-outcome').findMany({
            filters: {
              publishedAt: {
                $ne: null,
              },
            }
          }),
          strapi.db.query('api::case-industry.case-industry').findMany({
            filters: {
              publishedAt: {
                $ne: null,
              },
            }
          }),
          strapi.db.query('api::case-region.case-region').findMany({
            filters: {
              publishedAt: {
                $ne: null,
              },
            }
          }),
          strapi.db.query('api::case-service.case-service').findMany({
            filters: {
              publishedAt: {
                $ne: null,
              },
            }
          }),
          strapi.db.query('api::case-technology.case-technology').findMany({
            populate: {
              image: true,
            },
            filters: {
              publishedAt: {
                $ne: null,
              },
            }
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
