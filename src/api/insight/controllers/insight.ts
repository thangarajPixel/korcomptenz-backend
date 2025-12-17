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
        services?: { id: { $in: number[] }, slug?: { $eq: string } },
        // category?: { slug?: { $in: string[] } }
      } = {};
      if (ctx.query.filter) {
        const { technologies, services }: { technologies?: string[], services?: string[] } = ctx.query?.filter;

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
          attachment: true,
          featureImage: true,
          heroSection: {
            populate: {
              image: true,
            },
          },
          services: true,
          technologies: true,
          category: true,
        },
        filters: {
          ...filters,
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
            },
            { category: { slug: { $eq: ctx.query.slug } } },
            { publishedAt: { $notNull: true } },
          ]
        },
      };

      const entity = await strapi.service('api::insight.insight').find({
        ...ctx.query,
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      const { data } = this.transformResponse(sanitizedEntity) as { data: any };
      return data;
    } catch (error) {
      strapi.log.error('Insight find error:', error);
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
              image: true,
              mobileImage: true,
            }
          },
          attachment: true,
          technologies: true,
          seo: true,
          services: true,
          category: true,
          blog: {
            populate: {
              faq: true
            }
          },
          author: {
            populate: {
              image: true
            }
          },
          podcast: {
            populate: {
              podcastPlatForm: true
            }
          },
          webStories: {
            populate: {
              image: true
            }
          },
          webinar: {
            populate: {
              expert: {
                populate: {
                  list: {
                    populate: {
                      image: true
                    }
                  }
                }
              },
              demonstrate: {
                populate: {
                  list: {
                    populate: {
                      image: true
                    }
                  }
                }
              },
              buildData: {
                populate: {
                  thumbnail: true,
                },
              },
              summary: true,
            }
          },
          preWebinar: {
            populate: {
              preSummary: {
                populate: {
                  image: true
                }
              },
            }
          },
          featureImage: true,
        },
      });
      if (!entity) {
        return ctx.notFound('Page not found');
      }
      // If Blog
      if (entity.content === 'blog') {
        const techIds = entity.technologies?.map(t => t.id) || [];
        const serviceIds = entity.services?.map(s => s.id) || [];
        const tagIds = entity.tags?.map(t => t.id) || [];
        // Find related Insights
        const relatedInsight = await strapi.db.query('api::insight.insight').findMany({
          where: {
            slug: { $ne: ctx.params.slug }, // exclude current one
            $and: [
              { category: { id: { $in: entity.category.id } } },
              { publishedAt: { $notNull: true } },
              {
                $or: [
                  techIds.length ? { technologies: { id: { $in: techIds } } } : {},
                  serviceIds.length ? { services: { id: { $in: serviceIds } } } : {},
                  tagIds.length ? { tags: { id: { $in: tagIds } } } : {},
                ].filter(o => Object.keys(o).length), // remove empty filters
              }
            ],
          },
          populate: {
            heroSection: true,
            featureImage: true,
            category: true,
          },
          limit: 3,
          orderBy: { publishedAt: 'desc' },
        });
        // Get previous insight (published before current one)
        const previous = await strapi.db.query('api::insight.insight').findOne({
          where: {
            publishedAt: {
              $lt: entity.publishedAt, // less than current publishedAt
              $notNull: true
            },
            $or: [
              entity.category.id ? { category: { id: { $in: entity.category?.id } } } : {},
            ].filter(o => Object.keys(o).length),
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
            $or: [
              entity.category.id ? { category: { id: { $in: entity.category?.id } } } : {},
            ].filter(o => Object.keys(o).length),
          },
          orderBy: { publishedAt: 'asc' }, // get the earliest one after current
        });
        // Sanitize responses
        const sanitizedPrevious = await this.sanitizeOutput(previous, ctx);
        const sanitizedNext = await this.sanitizeOutput(next, ctx);
        return this.transformResponse({
          insight: entity,
          previousInsight: sanitizedPrevious,
          nextInsight: sanitizedNext,
          relatedInsight,
        });
      }

      return this.transformResponse(entity);
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
        //       connect: [{ id: 5, documentId: 'k1t8mt57hzh9heo4kf8oo428' }],
        //     },
        //   };
        // // Whitepaper
        // case 1:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 7, documentId: 'tqgxuobo3ykknuv4niwpwyuq' }],
        //     },
        //   };
        // // Infographic
        // case 91:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 6, documentId: 'qlbud817l53jbf4b50i4pt39' }],
        //     },
        //   };
        // // eBook
        // case 90:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 16, documentId: 'kqs5f7lkgt432fl14n8ydb7h' }],
        //     },
        //   };

        // // Webinar
        // case 13:
        //   return {
        //     ...commonData,
        //     content: "post-webinar",
        //     category: {
        //       connect: [{ id: 19, documentId: 's6jjkj9ixjg56mzrfg2yyt1c' }],
        //     },
        //   };
        // // Podcast
        // case 78:
        //   return {
        //     ...commonData,
        //     content: "podcast",
        //     category: {
        //       connect: [{ id: 13, documentId: 'hyumjqk5bakfegvsgl2iprx4' }],
        //     },
        //   };
        // // Webstories
        // case 1031:
        //   return {
        //     ...commonData,
        //     content: "web-stories",
        //     category: {
        //       connect: [{ id: 15, documentId: 'bo4gzyj4zugpxms5lyf2sndg' }],
        //     },
        //   };
        // // Blog
        // case 12:
        //   return {
        //     ...commonData,
        //     content: "blog",
        //     blog: {
        //       content: item.content.rendered,
        //     },
        //     category: {
        //       connect: [{ id: 12, documentId: 'qi23wcmwgcs165djrz2b511d' }],
        //     },
        //   };
        default:
          return null;
      }
    }).filter((item) => item);
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
        ...entity.service.map((item) => ({ ...item, from: 'service' })),
        ...entity.technology.map((item) => ({ ...item, from: 'technology' }))
      ]
      const sanitizedEntity = await this.sanitizeOutput(compileData, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error('Insight search error:', error);
      return ctx.internalServerError('Failed to fetch insight data');
    }
  },
}));
