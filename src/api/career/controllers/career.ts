/**
 * career controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs'

export default factories.createCoreController('api::career.career', ({ strapi }) => ({
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
            'career.open-jobs': true,
            'career.mansonry-gallery-section': {
              populate: {
                list: {
                  populate: {
                    column: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
              },
            },
            'career.career-build-data': {
              populate: {
                image: true,
              },
              'contact-us.news-letter': {
                populate: {
                  form: {
                    populate: {
                      forms: true
                    }
                  }
                }
              },
            }
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
