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
              policy: true,
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
                  href: true,
                  footerLink: true,
                  child: {
                    populate: {
                      href: true,
                      attachment: true
                    },
                  },
                },
              },
            },
          },

          'industriesMenu': {
            populate: {
              sections: {
                populate: {
                  image: true,
                  href: true,
                  items: {
                    populate: {
                      href: true,
                    },
                  },
                },
              }
            }
          },
          'ecosystemMenu': {
            populate: {
              item: {
                populate: {
                  image: true,
                  child: {
                    populate: {
                      description: {
                        populate: {
                          href: true,
                        },
                      },
                      href: true,
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
              whoWeAre: {
                populate: {
                  image: true,
                },
              },
              navigationItems: true,
              sidebarSections: {
                populate: {
                  icon: true,
                },
              },
            },
          },
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
