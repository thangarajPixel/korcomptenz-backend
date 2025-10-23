/**
 * page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
      };

      const { results, pagination } = await strapi.service('api::page.page').find(ctx.query);

      return { data: results, meta: { pagination } };
    } catch (error) {
      strapi.log.error('Page find error:', error);
      return ctx.internalServerError('Failed to fetch page data');
    }
  },
  async findOneBySlug(ctx) {
    try {
      const { slug } = ctx.query as { slug: string[] };
      const customSlug = slug?.join('/');
      if (!customSlug) {
        return ctx.badRequest('Slug parameter is required');
      }
      const entity = await strapi.db.query('api::page.page').findOne({
        where: {
          slug:
            slug ? `/${customSlug}` : '/',
          publishedAt: { $notNull: true },
        },
        populate: {
          list: {
            on: {
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
              'page-componets.sap-section-data': {
                populate: {
                  imageSection: {
                    populate: {
                      image1: {
                        populate: {
                          image: true,
                        }
                      }, image2: {
                        populate: {
                          image: true,
                        }
                      }
                    }
                  },
                  card: { populate: true },
                },
              },
              'page-componets.solutions-data': {
                populate: {
                  image: true,
                  slideContent: { populate: true },
                },
              },
              'page-componets.salesforce-services': {
                populate: {
                  salesforceServices: { image: true },
                },
              },
              'page-componets.domain-data': {
                populate: {
                  slides: {
                    populate: {
                      image: true
                    }
                  },
                },
              },
              'page-componets.benefit-data': {
                populate: {
                  image: true,
                  cards: { populate: true },
                },
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
              'page-componets.sticky-cards-list': {
                populate: {
                  list: {
                    populate: {
                      image: true
                    },
                  },
                },
              },
              'page-componets.inspire-section': {
                populate: {
                  list: {
                    populate: {
                      image: true,
                    },
                  }
                }
              },
              'page-componets.faq-title': {
                populate: {
                  faq: true
                }
              },
              'page-componets.dark-slider-list': {
                populate: {
                  slides: {
                    populate: {
                      image: true
                    }
                  },
                },
              },
              'page-componets.light-slider-list': {
                populate: {
                  list: { populate: { solutions: true } },
                  image: true
                },
              },
              'page-componets.sticky-title-list': {
                populate: {
                  list: {
                    populate: {
                      image: true,
                      mainImage: true
                    }
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
              'page-componets.demonstrate-section': {
                populate: {
                  list: {
                    populate: {
                      image: true
                    }
                  }
                }
              },
              "page-componets.tech-data": {
                populate: {
                  image: true,
                  mobileimage: true,
                  techslides: true
                },
              },
              "home.schedule-call": true,
              "page-componets.why-we-are": {
                populate: {
                  list: {
                    populate: {
                      image: true,
                    },
                  },
                },
              },
              "page-componets.gram-banner": {
                populate: {
                  image: true,
                  mobileImage: true,
                },
              },
              "page-componets.stretchable-section": {
                populate: {
                  image: true,
                  list: {
                    populate: {
                      image: true,
                    },
                  },
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
              'form-fields.form': {
                populate: {
                  form: {
                    populate: {
                      forms: true
                    }
                  }
                }
              },
              'case-study.partner-section': {
                populate: {
                  partner: {
                    populate: {
                      logo: true,
                    },
                  },
                },
              },
            },
          },
          seo: true,
        }
      });
      if (!entity) {
        return ctx.notFound('Page not found');
      }
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.log(error, ':error');
      return ctx.internalServerError('An error occurred while fetching the page');
    }
  },
}));