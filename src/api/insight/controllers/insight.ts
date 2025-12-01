/**
 * insight controller
 */

import { factories } from '@strapi/strapi'
import bulkJson from "../../../../public/kore.json";

export default factories.createCoreController('api::insight.insight', ({ strapi }) => ({
  async find(ctx) {
    try {
      const filters: {
        technologies?: { id: { $in: number[] }, slug?: { $eq: string } },
        services?: { id: { $in: number[] }, slug?: { $eq: string } }
      } = {};
      if (ctx.query.filter) {   // Get simple frontend filters, e.g. ?technologies=2,4&services=3
        const { technologies, services }: { technologies?: string[], services?: string[] } = ctx.query?.filter;

        // Build filters dynamically

        if (technologies) {
          const techIds = technologies.map(Number);
          filters.technologies = { id: { $in: techIds } };
        }

        if (services) {
          const serviceIds = services.map(Number);
          filters.services = { id: { $in: serviceIds } };
        }
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
          services: true,
          technologies: true,
          category: true,
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

      const entity = await strapi.service('api::insight.insight').find({
        ...ctx.query,
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      const { data } = this.transformResponse(sanitizedEntity) as { data: any };
      return {
        ...data
      };
    } catch (error) {
      strapi.log.error('Case Study find error:', error);
      return ctx.internalServerError('Failed to fetch insight data');
    }
  },
  async findOne(ctx) {
    try {
      const entity = await strapi.db.query('api::insight.insight').findOne({
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
          technologies: true,
          seo: true,
          services: true,
          category: true,
          blog: {
            populate: {
              faq: true
            }
          },
        },
      });
      if (!entity) {
        return ctx.notFound('Page not found');
      }
      // Find related case studies
      // Get previous insight (published before current one)
      const previous = await strapi.db.query('api::insight.insight').findOne({
        where: {
          publishedAt: {
            $lt: entity.publishedAt, // less than current publishedAt
            $notNull: true
          },
        },
        populate: {
          heroSection: { populate: { image: true } },
        },
        orderBy: { publishedAt: 'desc' }, // get the most recent one before current
      });

      // Get next insight (published after current one)
      const next = await strapi.db.query('api::insight.insight').findOne({
        where: {
          publishedAt: {
            $gt: entity.publishedAt, // greater than current publishedAt
            $notNull: true
          },
        },
        populate: {
          heroSection: { populate: { image: true } },
        },
        orderBy: { publishedAt: 'asc' }, // get the earliest one after current
      });
      // Sanitize responses
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      const sanitizedPrevious = await this.sanitizeOutput(previous, ctx);
      const sanitizedNext = await this.sanitizeOutput(next, ctx);
      return this.transformResponse({
        insight: sanitizedEntity,
        previousInsight: sanitizedPrevious,
        nextInsight: sanitizedNext,
      });
    } catch (error) {
      strapi.log.error('Insight find error:', error);
      return ctx.internalServerError('Failed to fetch insight data');
    }
  },
  async bulkCreate(ctx) {
    const compileData = (bulkJson as any).map((item) => {
      const commonData = {
        slug: item.slug,
        title: item.title.rendered,
        seo: {
          title: item.yoast_head_json.title,
          description: item.yoast_head_json.description || "",
        },
        heroSection: {
          description: item.yoast_head_json.description || "",
        },
        createdAt: item.date,
        publishedAt: item.date,
      }
      switch (item.categories[0]) {
        // // Brochure
        // case 194:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 5, isTemporary: true }],
        //     },
        //   };
        // // Whitepaper
        // case 1:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 7, isTemporary: true }],
        //     },
        //   };
        // // Infographic
        // case 91:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 6, isTemporary: true }],
        //     },
        //   };
        // // eBook
        // case 90:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 16, isTemporary: true }],
        //     },
        //   };

        // Webinar
        case 13:
          return {
            ...commonData,
            content: "file",
            category: {
              connect: [{ id: 19, isTemporary: true }],
            },
          };
        // Podcast
        case 78:
          return {
            ...commonData,
            content: "file",
            category: {
              connect: [{ id: 18, isTemporary: true }],
            },
          };
        // Webstories
        case 1031:
          return {
            ...commonData,
            content: "file",
            category: {
              connect: [{ id: 15, isTemporary: true }],
            },
          };
        // // Blog
        // case 12:
        //   return {
        //     ...commonData,
        //     content: "blog",
        //     blog: {
        //       content: item.content.rendered,
        //     },
        //     category: {
        //       connect: [{ id: 12, isTemporary: true }],
        //     },
        //   };
        default:
          return null;
      }
    }).filter((item) => item);
    console.log(compileData, 'compileData');
    try {
      const createdRecords = await Promise.all(
        compileData.map(async (item) => {
          return await strapi.service('api::insight.insight').create({
            data: item,
          });
        })
      );

      return {
        data: {
          success: true,
          message: 'Records uploaded successfully',
          count: createdRecords.length,
          records: createdRecords
        }
      };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  },
  async findFilter(ctx) {
    const entity = await strapi.service('api::insight.insight').findFilter(ctx);
    return this.transformResponse(entity);
  },
}));
