/**
 * new-room controller
 */

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
          attachment: false,
          list: {
            on: {
              'news-and-event.news-description-only': true,
              'news-and-event.news-title-description-only': true,
              'news-and-event.compounds-newsroom': {
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
              'news-and-event.simple-image-gallery': {
                populate: {
                  list: {
                    populate: {
                      image: true,
                    }
                  },
                }
              },
              'news-and-event.news-service': {
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
              'news-and-event.news-banner': {
                populate: {
                  image: true,
                  form: {
                    populate: {
                      forms: {
                        on: {
                          'form-fields.news-room-form': {
                            populate: {
                              list: true
                            }
                          }
                        }
                      }
                    }
                  },
                }
              },
              'news-and-event.color-custom-description': true,
              'news-and-event.testimonal-list': {
                populate: {
                  list: true,
                }
              },
              'news-and-event.build-data': {
                populate: {
                  image: true,
                  listDescription: {
                    populate: {
                      list: true,
                    }
                  },
                  button: true,
                },
              },
              'page-componets.gram-banner': true
            }
          }, seo: true
        },
      });
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
      console.log(error);
      return error;
    }
  }
}));
