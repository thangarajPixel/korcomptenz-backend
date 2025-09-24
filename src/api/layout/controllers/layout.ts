/**
 * layout controller
 */

import { factories } from '@strapi/strapi';


export default factories.createCoreController('api::layout.layout', ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        populate: {
          navItems: true,
          company: {
            populate: {
              companyLogo: true,
              companyFullLogo: true,
              companyDarkLogo: true,
              socialPlatforms: {
                populate: {
                  icon: true,
                },
              },
            },
          },
          // button: true,
          'serviceMenu': {
            populate: {
              image: true,
              items: {
                populate: {
                  child: true,
                },
              },
            },
          },

          'industriesMenu': {
            populate: {
              sections: {
                populate: { image: true, items: true }
              }
            }
          },
          scheduleCall: {
            populate: {
              image: true,
            },
          },

          'ecosystemMenu': {
            populate: {
              item: {
                populate: {
                  child: {
                    populate: {
                      description: true
                    }
                  },
                },
              }
            },
          },

          'insightMenu': {
            populate: {
              heroImage: true,
              categories: true,
            },
          },

          'aboutMenu': {
            populate: {
              whoWeAre: true,
              navigationItems: true,
              sidebarSections: {
                populate: {
                  icon: true,
                },
              },
            },
          },

          careers: true,
          successStories: true

        },
      };
      const entity = await strapi.service('api::layout.layout').find(ctx.query);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error('Layout find error:', error);
      return ctx.internalServerError('Failed to fetch layout data');
    }
  },
}));
