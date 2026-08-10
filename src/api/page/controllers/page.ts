/**
 * page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::page.page",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        ctx.query = {
          ...ctx.query,
          isLinkOnly: "hai",
        };

        const { results, pagination } = await strapi
          .service("api::page.page")
          .find(ctx.query);
        return { data: results, meta: { pagination } };
      } catch (error) {
        strapi.log.error("Page find error:", error);
        return ctx.internalServerError("Failed to fetch page data");
      }
    },

    async findOneBySlug(ctx) {
      try {
        const { slug } = ctx.query as { slug: string[] };
        const customSlug = slug?.join("/");
        if (!customSlug) {
          return ctx.badRequest("Slug parameter is required");
        }
        const entity = await strapi.db.query("api::page.page").findOne({
          where: {
            slug: slug ? `/${customSlug}` : "/",
            publishedAt: { $notNull: true },
          },
          populate: {
            list: {
              on: {
                "page-componets.banner-section-list": {
                  populate: {
                    list: {
                      populate: {
                        imageMobile: true,
                        image: true,
                        logo: true,
                        logoMobile: true,
                        formImage: true,
                        footer: {
                          populate: {
                            logo: true,
                          },
                        },
                        form: {
                          populate: {
                            forms: true,
                          },
                        },
                        customFooter: {
                          populate: {
                            image: true,
                            backgroundImage: true,
                            list: true,
                          },
                        },
                      },
                    },
                  },
                },
                "page-componets.sap-section-data": {
                  populate: {
                    image3: true,
                    imageSection: {
                      populate: {
                        image1: {
                          populate: {
                            image: true,
                          },
                        },
                        image2: {
                          populate: {
                            image: true,
                          },
                        },
                      },
                    },
                    card: { populate: true },
                    item: true,
                  },
                },
                "page-componets.solutions-data": {
                  populate: {
                    image: true,
                    slideContent: { populate: true },
                  },
                },
                "page-componets.salesforce-services": {
                  populate: {
                    salesforceServices: { image: true },
                  },
                },
                "page-componets.domain-data": {
                  populate: {
                    slides: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.benefit-data": {
                  populate: {
                    image: true,
                    cards: { populate: true },
                  },
                },
                "page-componets.build-data": {
                  populate: {
                    // image: true,
                    // mobileImage: true,
                    rightSection: {
                      populate: {
                        responsiveImage: {
                          populate: {
                            image: true,
                            mobileImage: true,
                          },
                        },
                        form: {
                          populate: {
                            forms: true,
                          },
                        },
                        customDescription: true,
                        customDescriptionImage: true,
                      },
                    },
                  },
                },
                "page-componets.sticky-cards-list": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.inspire-section": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.faq-title": {
                  populate: {
                    faq: {
                      populate: {
                        list: true,
                      },
                    },
                  },
                },
                "page-componets.dark-slider-list": {
                  populate: {
                    slides: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.light-slider-list": {
                  populate: {
                    list: { populate: { solutions: true } },
                    image: true,
                  },
                },
                "page-componets.sticky-title-list": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                        mainImage: true,
                      },
                    },
                  },
                },
                "page-componets.insights-section": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.demonstrate-section": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.tech-data": {
                  populate: {
                    image: true,
                    mobileimage: true,
                    techslides: true,
                  },
                },
                'home.schedule-call': {
                  populate: {
                     form: {
                      populate: {
                        forms: true,
                      },
                    },
                  },
                },
                "page-componets.why-we-are": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.newsletter-banner": {
                  populate: {
                    whatsIncludeContent: {
                      populate: ["sublist"],
                    },
                  },
                },
                "page-componets.newsletter-leadership-message": {
                  populate: {
                    AuthorImage: true,
                  },
                },
                "page-componets.newsletter-description": {
                  populate: true
                },
                "page-componets.newsletter-footer": {
                  populate: {
                    logo: true,
                    form: {
                      populate: {
                        forms: true,
                      },
                    },
                  },
                },
                "page-componets.gram-banner": {
                  populate: {
                    image: true,
                    mobileImage: true,
                    "*": true,
                    imageList: {
                      populate: {
                        image: true,
                        mobileImage: true,
                      },
                    },
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

                "case-study.case-study-sticky-cards-list": {
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
                "case-study.case-study-domain-data": {
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
                "form-fields.form": {
                  populate: {
                    form: {
                      populate: {
                        forms: true,
                      },
                    },
                  },
                },
                "case-study.partner-section": {
                  populate: {
                    partner: {
                      populate: {
                        logo: true,
                      },
                    },
                  },
                },
                "about-us.content-showcase-section-list": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "about-us.map-section-list": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "about-us.our-story": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "about-us.people-showcase-list": {
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
                "about-us.stats-section": {
                  populate: {
                    list: true,
                  },
                },
                "about-us.media-slider-section": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "about-us.achievement-section": {
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
                "demo-page.build-demo": {
                  populate: {
                    form: {
                      populate: {
                        forms: true,
                      },
                    },
                    item: true,
                  },
                },
                "demo-page.demo-banner-list": {
                  populate: {
                    list: {
                      populate: {
                        imageMobile: true,
                        image: true,
                        logo: true,
                        logoMobile: true,
                        formImage: true,
                        form: {
                          populate: {
                            forms: true,
                          },
                        },
                      },
                    },
                    demoDetails: {
                      populate: {
                        bannerInfo: {
                          populate: {
                            details: {
                              populate: {
                                icon: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                "demo-page.demo-partnership": {
                  populate: {
                    list: {
                      populate: {
                        logo: true,
                      },
                    },
                  },
                },

                "demo-page.demo-demonstration": {
                  populate: {
                    list: true,
                    footer: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "demo-page.experts-section": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "demo-page.demo-opportunity": {
                  populate: {
                    bannerImage: true,
                    arrowImage: true,
                    list: true,
                  },
                },
                "page-componets.pricing-section": {
                  populate: {
                    plans: {
                      populate: {
                        button: true,
                      },
                    },
                  },
                },
                "insight-section.insight-list": {
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
                "kor-cares.straight-slider": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "kor-cares.kor-care-build-data": {
                  populate: {
                    thumbnail: true,
                  },
                },
                "kor-cares.impact-highlight": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "kor-cares.impact-description": {
                  populate: {
                    image: true,
                  },
                },
                "kor-cares.award": {
                  populate: {
                    image: true,
                  },
                },
                "home.hero-section-one": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                        mobile_image: true,
                        mobileVideo: true,
                        logo: true,
                      },
                    },
                  },
                },
                "career.mansonry-gallery-section": {
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
                "page-componets.digital-benefits": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.full-width-gram-banner": {
                  populate: {
                    backroundImage: true,
                  },
                },
                "page-componets.kpi-partner": {
                  populate: {
                    items: {
                      populate: {
                        icon: true,
                      },
                    },
                  },
                },
                "page-componets.cta-banner": {
                  populate: {
                    backroundImage: true,
                  },
                },
                "page-componets.digital-services-section": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.digital-card-slider": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.digital-about": {
                  populate: {
                    backgroundImage: true,
                    badges: {
                      populate: {
                        badge1: true,
                        badge2: true,
                      },
                    },
                    stats: true,
                    features: {
                      populate: {
                        icon: true,
                      },
                    },
                    countries: {
                      populate: {
                        flag: true,
                      },
                    },
                  },
                },
                "page-componets.digital-erp-list": {
                  populate: true,
                },
                "page-componets.digital-analytics": {
                  populate: true,
                },
                "page-componets.custom-script": true,
                "page-componets.digital-full-lifecycle": {
                  populate: {
                    top: {
                      populate: {
                        topList: {
                          populate: {
                            image: true,
                          },
                        },
                      },
                    },
                    mid: {
                      populate: {
                        midList1: true,
                        midList2: true,
                      },
                    },
                    bottom: {
                      populate: {
                        bottomCard: true,
                      },
                    },
                  },
                },
                "page-componets.digital-inspire": {
                  populate: {
                    list: {
                      populate: {
                        image1: true,
                        image2: true,
                      },
                    },
                  },
                },
                "page-componets.combined-about-card-slider": {
                  populate: {
                    digitalAbout: {
                      populate: {
                        backgroundImage: true,
                        badges: {
                          populate: {
                            badge1: true,
                            badge2: true,
                          },
                        },
                        stats: true,
                        features: {
                          populate: {
                            icon: true,
                          },
                        },
                        countries: {
                          populate: {
                            flag: true,
                          },
                        },
                      },
                    },
                    digitalCardSlider: {
                      populate: {
                        list: {
                          populate: {
                            image: true,
                          },
                        },
                      },
                    },
                  },
                },
                "page-componets.smart-forge-operational-roadblock": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.smart-forge-build": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.smart-forge-enterprises": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.digital-card": {
                  populate: {
                    list: true,
                  },
                },
                "news-and-event.news-banner": {
                  populate: {
                    image: true,
                    imageMobile: true,
                    form: {
                      populate: {
                        forms: {
                          on: {
                            "form-fields.news-room-form": {
                              populate: {
                                list: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                "page-componets.export-migration": {
                  populate: {
                    image: true,
                    backgroundImage: true,
                  },
                },
                "page-componets.fabcon-ai-powered": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.fabcon-data-analytics": {
                  populate: {
                    backgroundImage: true,
                    top: {
                      populate: {
                        image: true,
                      },
                    },
                    mid: {
                      populate: {
                        midList: {
                          populate: {
                            image: true,
                          },
                        },
                      },
                    },
                    bottom: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.fabcon-about": {
                  populate: {
                    image: true,
                    backgroundImage: true,
                  },
                },
                "page-componets.fabcon-smart-forge": {
                  populate: {
                    buttonImage: true,
                    backgroundImage: true,
                    image: true,
                  },
                },
                "page-componets.fabcon-led-transformation": {
                  populate: {
                    image: true,
                    backgroundImage: true,
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.fabcon-composable-intelligence": {
                  populate: {
                    backgroundImage: true,
                    list: {
                      populate: {
                        mainImage: true,
                        subImage: true,
                      },
                    },
                  },
                },
                "page-componets.fabcon-fabric-ai-leadership": {
                  populate: {
                    backgroundImage: true,
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.fabcon-fabric-community-conference": {
                  populate: {
                    backgroundImage: true,
                    form: {
                      populate: {
                        forms: {
                          on: {
                            "form-fields.fabcon-book-meet": true,
                          },
                        },
                      },
                    },
                  },
                },
           "page-componets.community-conference-banner": {
  populate: {
    backgroundImage: true,
    form: {
      populate: {
        forms: {
          on: {
            "form-fields.community-summit-meeting": {
              populate: {
                TimeslotList: true,
              },
            },
          },
        },
      },
    },
  },
},
                "page-componets.fabcon-decision-fabric": {
                  populate: {
                    backgroundImage: true,
                    form: {
                      populate: {
                        forms: {
                          on: {
                            "form-fields.fabcon-book-meet": true,
                          },
                        },
                      },
                    },
                  },
                },
                "page-componets.midmarket-enterprises": {
                  populate: {
                    backgroundImage: true,
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.sap-implementation": {
                  populate: {
                    list: {
                      populate: {
                        sublist: true,
                      },
                    },
                  },
                },
                "page-componets.slider-service-section": {
                  populate: {
                    tablist: {
                      populate: {
                        sublist: {
                          populate: {
                            image: true,
                          },
                        },
                      },
                    },
                  },
                },
                "page-componets.microsoft-gold-certified": {
                  populate: {
                    card1: {
                      populate: {
                        image: true,
                      },
                    },
                    card2: {
                      populate: {
                        image: true,
                        buttonImage: true,
                      },
                    },
                  },
                },
                "page-componets.sap-questionnaire": {
                  populate: {
                    sap_questionnaire_form_label: {
                      populate: {
                        formLabel: {
                          populate: {
                            form: {
                              populate: "*",
                            },
                          },
                        },
                      },
                    },
                  },
                },

                /* KOR dev Team Start */
                "page-componets.demand-how-kor-section": {
                  populate: {
                    image: true,
                    list: { populate: true },
                  },
                },
                "page-componets.key-metrics-section": {
                  populate: {
                    images: {
                      populate: {
                        image: true,
                      },
                    },
                    listLeft: true,
                    backgroundImage: true,
                    form: {
                      populate: {
                        forms: {
                          on: {
                            "form-fields.contact-us-form": {
                              populate: {
                                list: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },

              'page-componets.sap-why-korcomptenz': {
                populate: {
                  images: {
                    populate: {
                      image: true,
                    }
                  },
                  subtext: true,
                  title: true,
                  description: true,

                  listbox: {
                    populate: {
                      title: true,
                      description: true,
                      icon: true,

                    },
                  },
                },
              },

              'page-componets.page-grid-view': {
                populate: {

                  Title: true,
                  gridlist: true,
                  description: true,
                  tag: true,

                }
              },
              'page-componets.our-offerings': {
                populate: {
                  subtitle: true,
                  title: true,
                  columntitle: {
                    populate: {
                      divtitle: true,
                      interlinks: {
                        populate: {
                          urlname: true,
                          urllink: true,
                        },
                      },
                    },
                  },
                },
              },
              'page-componets.sap-practice-areas': {
                populate: {
                  gridlisting: {
                    buttontext: true,
                    buttonurl: true,
                    title: true,
                    description: true,
                    populate: {
                      image: true,
                    },
                  },
                  subtext: true,
                  title: true,
                  description: true,
                },
              },
              'page-componets.what-to-expect': {
                populate: {
                  gridlisting: {
                    buttontext: true,
                    buttonurl: true,
                    title: true,
                    description: true,

                  },
                  subtext: true,
                  title: true,
                  description: true,
                },
              },
              'page-componets.client-testimonial': {
                populate: {
                  testimonials: {
                    clientname: true,
                    designation: true,
                    content: true,
                    star: true,
                    title: true,
                  },
                  subtext: true,
                  title: true,

                },
              },
              'page-componets.certifications-section': {
                populate: {
                  partnerlogos: {
                    populate: {
                      logoimage: true,
                    },
                  },
                  description: true,
                  title: true,

                },
              },
              'page-componets.request-consultation': {
                populate: {
                  form: {

                    populate: {

                      forms: true

                    }

                  },
                  description: true,
                  title: true,
                  subtext: true,

                },   
              },
                /* KOR dev Team End */

                "page-componets.banking-financial-banner": {
                  populate: {
                    image: true,
                    imageMobile: true,
                    formImage: true,
                    form: {
                      populate: {
                        forms: true,
                      },
                    },
                    list: {
                      populate: {
                        imageMobile: true,
                        image: true,
                        logo: true,
                        logoMobile: true,
                      },
                    },
                  },
                },
                "page-componets.industry-build-data": {
                  populate: {
                    image: true,
                    mobileImage: true,
                  },
                },
                "page-componets.industry-solution-spotlight": {
                  populate: {
                    list: {
                      populate: {
                        imageMobile: true,
                        image: true,
                        logo: true,
                        logoMobile: true,
                      },
                    },
                  },
                },
                "page-componets.industry-intelligent-experience": {
                  populate: {
                    list: {
                      populate: {
                        imageMobile: true,
                        image: true,
                        logo: true,
                        logoMobile: true,
                      },
                    },
                  },
                },
                "page-componets.industry-featured-content": {
                  populate: {
                    list: {
                      populate: {
                        bgImage: true,
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.industry-service-portfolio": {
                  populate: {
                    list: {
                      populate: {
                        list: {
                          populate: {
                            image: true,
                            subList: {
                              populate: {
                                descriptionList: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                "page-componets.cloud-recognition": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.cloud-warning-signs": {
                  populate: {
                    list: true,
                  },
                },
                "page-componets.cloud-technology": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.cloud-one-platform": {
                  populate: {
                    image: true,
                    mobileImage: true,
                  },
                },
                "page-componets.cloud-first-call": {
                  populate: {
                    listOne: true,
                    listTwo: true,
                    listThree: true,
                    listFour: true,
                    listFive: true,
                  },
                },
                "page-componets.cloud-ai-power": {
                  populate: {
                    list: {
                      populate: {
                        bgImage: true,
                        subList: true,
                      },
                    },
                  },
                },
                "page-componets.cloud-readiness-report": {
                  populate: {
                    form: {
                      populate: {
                        forms: true,
                      },
                    },
                  },
                },
                "page-componets.cloud-banner": {
                  populate: {
                    image: true,
                    mobileImage: true,
                    list: {
                      populate: {
                        subList: true,
                      },
                    },
                  },
                },
                "page-componets.cloud-key-offerings": {
                  populate: {
                    list: {
                      populate: {
                        subList: true,
                      },
                    },
                  },
                },
                "page-componets.cloud-migration-handle": {
                  populate: {
                    list: {
                      populate: {
                        image: true,
                        subList: true,
                      },
                    },
                  },
                },
                "page-componets.cloud-built-people": {
                  populate: {
                    list: true,
                  },
                },
                "page-componets.altiaris-checklist": {
                  populate: {
                    image: true,
                    altiarisgridlist: {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                "page-componets.tab-section": {
                  populate: {
                    tablist: {
                      populate: {
                        tablistdetails: {
                          populate: {
                            icon: true,
                          },
                        },
                      },
                    },
                  },
                },
                 
                "page-componets.step-grid-section": {
                  populate: {
                    gridlist: {
                      populate: {
                        griddetails: {
                          populate: {
                            image: true,
                            checklistitems: true,
                          },
                        },
                      },
                    },
                  },
                },
                "page-componets.grid-system": {
                  populate: {
                    centericon: true,
                    griditemlist: {
                      populate: {
                        icon: true,
                        listitems: {
                          populate: {
                            image: true,
                          },
                        },
                      },
                    },

                    footergridlist: {
                      populate: {
                        icon: true,
                      },
                    },
                  },
                },
              },
            },
            seo: true,
          },
        });

        if (entity?.list) {
          for (const section of entity.list) {
            // ✅ Banner section list
            if (section.__component === "page-componets.banner-section-list") {
              for (const item of section.list ?? []) {
                if (item.isForm && !item.pageSlug) {
                  item.pageSlug = {
                    id: entity.id,
                    documentId: entity.documentId,
                    slug: entity.slug,
                    pageTitle: entity.pageTitle,
                  };
                }
              }
            }

            // ✅ Demo banner list
            if (section.__component === "demo-page.demo-banner-list") {
              for (const item of section.list ?? []) {
                if (item.isForm && !item.pageSlug) {
                  item.pageSlug = {
                    id: entity.id,
                    documentId: entity.documentId,
                    slug: entity.slug,
                    pageTitle: entity.pageTitle,
                  };
                }
              }
            }
          }
        }

        if (!entity) {
          const notFoundPages = await strapi.db
            .query("api::not-found.not-found")
            .findMany({
              where: {
                publishedAt: { $notNull: true },
              },
              populate: {
                list: {
                  on: {
                    "not-found.not-found": {
                      populate: {
                        image: true,
                      },
                    },
                  },
                },
                seo: true,
              },
            });

          const notFoundPage = notFoundPages?.[0];
          if (!notFoundPage) {
            return ctx.notFound("Page not found");
          }
          const sanitizedEntity = await this.sanitizeOutput(notFoundPage, ctx);
          return this.transformResponse(sanitizedEntity);
        }
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
      } catch (error) {
        console.log(error, ":error");
        return ctx.internalServerError(
          "An error occurred while fetching the page",
        );
      }
    },
  }),
);
