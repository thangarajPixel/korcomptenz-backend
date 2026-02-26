/**
 * contact-us controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs'

export default factories.createCoreController('api::contact-us.contact-us', ({ strapi }) => ({
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
                },
                button: true
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
                    footer: {
                      populate: {
                        logo: true,
                      }
                    }
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
                    },
                    customDescription: true,
                  }
                }
              },
            },
            'contact-us.our-office': {
              populate: {
                image: true
              }
            },
            'contact-us.office-location-list': {
              populate: {
                list: {
                  populate: {
                    image: true
                  }
                }
              }
            },
            'contact-us.news-letter': {
              populate: {
                image: true
              }
            },
            'contact-us.contact-us-insight-list': {
              populate: {
                list: {
                  populate: {
                    image: true
                  }
                }
              }
            },
            'contact-us.contact-us-form-section': {
              populate: {
                images: {
                  populate: {
                    image: true,
                  }
                },
                listLeft: true,
                form: {
                  populate: {
                    forms: {
                      on: {
                        'form-fields.contact-us-form': {
                          populate: {
                            list: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            'contact-us.fixed-section': {
              populate: {
                buttons: true
              }
            }
          }
        }, seo: true
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
