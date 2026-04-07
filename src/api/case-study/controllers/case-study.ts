/**
 * case-study controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::case-study.case-study', ({ strapi }) => ({
  async find(ctx) {
    try {
      const filters: {
        technologies?: { id: { $in: number[] }, slug?: { $eq: string } },
        services?: { id: { $in: number[] }, slug?: { $eq: string } },
        regions?: { id: { $in: number[] } },
        case_industries?: { id: { $in: number[] } }
        outcome?: { id: { $in: number[] } }
      } = {};
      if (ctx.query.filter) {   // Get simple frontend filters, e.g. ?technologies=2,4&services=3
        const { technologies, services, regions, industries, businessOutcomes }: { technologies?: string[], services?: string[], regions?: string[], industries?: string[], businessOutcomes?: string[] } = ctx.query?.filter;

        // Build filters dynamically

        if (technologies) {
          const techIds = technologies.map(Number);
          filters.technologies = { id: { $in: techIds } };
        }

        if (services) {
          const serviceIds = services.map(Number);
          filters.services = { id: { $in: serviceIds } };
        }

        if (regions) {
          const regionIds = regions.map(Number);
          filters.regions = { id: { $in: regionIds } };
        }

        if (industries) {
          const industryIds = industries.map(Number);
          filters.case_industries = { id: { $in: industryIds } };
        }
        if (businessOutcomes) {
          const industryIds = businessOutcomes.map(Number);
          filters.outcome = { id: { $in: industryIds } };
        }
      }

      ctx.query = {
        ...ctx.query,
        populate: {
          attachment: true,
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
          seo: true,
        },
        where: {
          $and: [
            {
              $or: [
                {
                  title: {
                    $contains: ctx?.query?.search,
                  }
                },
                {
                  heroSection: {
                    description: {
                      $contains: ctx?.query?.search,
                    }
                  }
                }
              ]
            }
          ]
        },
        filters: {
          ...filters,
          $and: [
            {
              $or: [
                {
                  services: {
                    slug: {
                      $eq: ctx.query.slug,
                    },
                  },
                },
                {
                  technologies: {
                    slug: {
                      $eq: ctx.query.slug,
                    },
                  },
                },
              ],
            }
          ],
        },
      };
      const sponserQuery = {
        filters: {
          $and: [
            {
              $or: [
                {
                  case_service: {
                    slug: {
                      $eq: ctx.query.slug,
                    },
                  },
                },
                {
                  case_technology: {
                    slug: {
                      $eq: ctx.query.slug,
                    },
                  },
                },
              ],
            }
          ],
        },
      }
      const entity = await strapi.service('api::case-study.case-study').find({
        ...ctx.query,
      });
      const sponser = await strapi.service('api::case-study-sponser.case-study-sponser').find({
        ...sponserQuery,
        populate: {
          sponser: {
            populate: {
              image: true,
              logo: true,
            }
          }
        },
      });
      const service = await strapi.service('api::case-service.case-service').find({
        populate: '*',
      });
      const technology = await strapi.service('api::case-technology.case-technology').find({
        populate: '*',
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      const { data } = this.transformResponse(sanitizedEntity) as { data: any };
      return {
        ...data,
        sponsor: sponser?.results?.[0] || null,
        service: service?.results || [],
        technology: technology?.results || [],
      };
    } catch (error) {
      strapi.log.error('Case Study find error:', error);
      return ctx.internalServerError('Failed to fetch case study data');
    }
  },
  async findOne(ctx) {
    try {
      const entity = await strapi.db.query('api::case-study.case-study').findOne({
        // ...ctx.query,
        where: {
          slug: ctx.params.slug,
          publishedAt: { $notNull: true },
        },
        populate: {
          heroSection: {
            populate: {
              image: true
            }
          },
          descriptionSection: true,
          testimonials: true,
          attachment: true,
          rightSection: {
            populate: {
              icon: true,
              preTitle: {
                populate: {
                  icon: true
                }
              },
              customDescription: true,
            },
          },
          relatedCaseStudies: {
            populate: {
              heroSection: { populate: { image: true } },
            }
          },
          case_industries: true,
          regions: true,
          technologies: true,
          seo: true,
          services: true,
          video: {
            populate: {
              thumbnail: true
            }
          },
          offeringList: {
            populate: {
              image: true
            }
          }
        },
      });
      // if (!entity) {
      //   return ctx.notFound('Page not found');
      // }
      // Extract related field IDs
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
      // Sanitize responses
      // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      // const sanitizedRelated = await this.sanitizeOutput(related, ctx);

      if (!entity) {
        const notFoundPages = await strapi.db.query('api::not-found.not-found').findMany({
          where: {
            publishedAt: { $notNull: true },
          },
          populate: {
            list: {
              on: {
                'not-found.not-found': {
                  populate: {
                    image: true,
                  },
                }
              }
            },
            seo: true,
          }
        });

        const notFoundPage = notFoundPages?.[0];
        if (!notFoundPage) {
          return ctx.notFound('Page not found');
        }
        const sanitizedEntity = await this.sanitizeOutput(notFoundPage, ctx);
        return this.transformResponse(sanitizedEntity);
      }

      // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(entity);
    } catch (error) {
      strapi.log.error('Case Study find error:', error);
      return ctx.internalServerError('Failed to fetch case study data');
    }
  },
  async findFilter(ctx) {
    try {
      const entity = await strapi.service('api::case-study.case-study').getAllFilter(ctx);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error('Case Study filter error:', error);
      return ctx.internalServerError('Failed to fetch case study data');
    }
  },
  async search(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        limit: 5,
        where: {
          label: {
            $contains: ctx?.query?.search,
          }
        },
      }
      const entity = await strapi.service('api::case-study.case-study').getAllFilter(ctx);
      const compileData = [
        ...entity.businessOutcomes.map((item) => ({ ...item, from: 'businessOutcomes' })),
        ...entity.industries.map((item) => ({ ...item, from: 'industries' })),
        ...entity.region.map((item) => ({ ...item, from: 'region' })),
        ...entity.service.map((item) => ({ ...item, from: 'service' })),
        ...entity.technology.map((item) => ({ ...item, from: 'technology' }))
      ]
      const sanitizedEntity = await this.sanitizeOutput(compileData, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error('Case Study filter error:', error);
      return ctx.internalServerError('Failed to fetch case study data');
    }
  },
  async essential(ctx) {
    try {
      const entity = await strapi.service('api::case-study.case-study').getEssential(ctx);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error('Case Study filter error:', error);
      return ctx.internalServerError('Failed to fetch case study data');
    }
  },
  async findByAttachment(ctx) {
    try {
      const { filename } = ctx.params;

      if (!filename) {
        return ctx.badRequest('Filename parameter is required');
      }

      // Use the service find method
      const entity = await strapi.service('api::case-study.case-study').find({
        filters: {
          attachment: {
            name: {
              $eq: filename
            }
          }
        },
        populate: {
          attachment: true,
        },
      });

      if (!entity?.results || entity.results.length === 0) {
        return ctx.notFound('Case study with this attachment not found');
      }

      // Get the attachment from the first matching case study
      const attachment = entity.results[0].attachment;

      if (!attachment) {
        return ctx.notFound('Attachment not found');
      }

      // Return only name and url
      return {
        name: attachment.name,
        url: attachment.url
      };

    } catch (error) {
      strapi.log.error('Case Study findByAttachment error:', error);
      return ctx.internalServerError('Failed to fetch case study attachment');
    }
  }
}));
