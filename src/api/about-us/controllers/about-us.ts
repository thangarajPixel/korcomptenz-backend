/**
 * about-us controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs'

export default factories.createCoreController('api::about-us.about-us', ({ strapi }) => ({
  async find(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        list: {
          on: {
            'home.schedule-call': true,
            'home.services-section': {
              populate: {
                list: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
            'home.opportunity': {
              populate: {
                bannerImage: true,
                arrowImage: true,
                profiles: {
                  populate: {
                    image: true
                  }
                }
              },
            },
            'page-componets.banner-section-list': {
              populate: {
                list: {
                  populate: {
                    imageMobile: true,
                    image: true,
                    logo: true,
                    logoMobile: true,
                  }
                },
              }
            },
            'page-componets.build-data': {
              populate: {
                // image: true,
                // mobileImage: true,
                rightSection: {
                  populate: {
                    responsiveImage: {
                      populate: {
                        image: true,
                        mobileImage: true,
                      }
                    },
                    form: {
                      populate: {
                        forms: true
                      }
                    }
                  }
                }
              },
            },
            'page-componets.benefit-data': {
              populate: {
                image: true,
                cards: { populate: true },
              },
            },
            'about-us.content-showcase-section-list': {
              populate: {
                list: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
            'about-us.map-section-list': {
              populate: {
                list: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
            'about-us.our-story-list': {
              populate: {
                list: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
            'about-us.people-showcase-list': {
              populate: {
                list: {
                  populate: {
                    image: true,
                    socialPlatform: {
                      populate: {
                        icon: true,
                      },
                    },
                  },
                },
              },
            },
            'about-us.stats-section': {
              populate: {
                list: true
              },
            },
            'about-us.media-slider-section': {
              populate: {
                list: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
            'about-us.achievement-section': {
              populate: {
                list: {
                  populate: {
                    columns: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
              },
            },
          }
        }
      },
    }, {
      encode: false,
    })

    ctx.query = {
      ...ctx.query,
      ...qs.parse(populateQuery),
    };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    return { data: { ...data }, meta };
  }
}));
