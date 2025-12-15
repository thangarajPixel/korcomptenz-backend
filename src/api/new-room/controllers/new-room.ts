/**
 * new-room controller
 */

import qs from 'qs';
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::new-room.new-room', ({ strapi }) => ({
  async findOne(ctx) {

    try {
      const entity = await strapi.db.query('api::new-room.new-room').findOne({
        // ...ctx.query,
        where: {
          slug: ctx.params.slug,
          publishedAt: { $notNull: true },
        },
        populate: {
          list: {
            on: {
              'new-room.news-description-only': {
                populate: true,
              },
              'new-room.news-title-description-only': {
                populate: true,
              },
              'new-room.compounds-newsroom': {
                populate: {
                  heading: true,
                  stretchableComponent: {
                    populate: {
                      list: true,
                    }
                  },
                  thirdSection: {
                    populate: {
                      list: true,
                    }
                  },
                }
              },
              'new-room.simple-image-gallery': {
                populate: {
                  list: {
                    populate: {
                      image: true,
                    }
                  },
                }
              },
              'new-room.news-service': {
                populate: {
                  heading: true,
                  button: true,
                  thirdSection: {
                    populate: {
                      list: true,
                    }
                  },
                }
              },
              'new-room.news-banner': {
                populate: {
                  image: true,
                }
              },
            }
          }
        },
      });
      if (!entity) {
        return ctx.notFound('Page not found');
      }
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}));
