/**
 * home controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs';

export default factories.createCoreController('api::home.home', ({ strapi }) => ({
  async find(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        list: {
          on: {
            'home.hero-section-one': {
              populate: {
                list: {
                  populate: {
                    image: true,
                    mobile_image: true,
                    mobileVideo: true,

                    logo: true,
                    video: true,
                    bannerImage: true,
                    backgroundImage: true
                  },
                },
              },
            },
            'home.schedule-call': true,
            'home.we-are-korcomptenz': {
              populate: {
                image: true,
              },
            },
             "home.home-sliding-section": {
                  populate: {

                    SliderEntries: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
            'home.services-section': {
              populate: {
                list: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
            'page-componets.sticky-cards-list': {
              populate: {
                list: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
            'page-componets.insights-section': {
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
                },
                button: true,
              },
            },
            'page-componets.inspire-section': {
              populate: {
                list: {
                  populate: {
                    image: true
                  }
                }
              },
            },
            'case-study.case-study-sticky-cards-list': {
              populate: {
                list: {
                  populate: {
                    heroSection: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
              },
            },
            'case-study.case-study-domain-data': {
              populate: {
                list: {
                  populate: {
                    heroSection: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
              },
            },
            'insight-section.insight-list': {
              populate: {
                list: {
                  populate: {
                    heroSection: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
              },
            },
          }
        },
        seo: true
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
