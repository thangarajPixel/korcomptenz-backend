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
              footerLink: true,
              items: {
                populate: {
                  href: true,
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

  async globalSearch(ctx) {
    try {
      const { q } = ctx.query;

      if (!q || typeof q !== 'string') {
        return ctx.badRequest('Search query is required');
      }

      const searchTerm = q.toLowerCase().trim();

      // 🔍 Log the incoming query
      console.log('🔍 Search Query Raw:', ctx.query);
      console.log('🔍 Search Term:', searchTerm);

      const layout = await strapi.entityService.findMany('api::layout.layout', {
        populate: {
          serviceMenu: {
            populate: {
              items: {
                populate: {
                  href: true,
                  child: { populate: { href: true } },
                },
              },
            },
          },
          industriesMenu: {
            populate: {
              sections: {
                populate: {
                  href: true,
                  items: { populate: { href: true } },
                },
              },
            },
          },
          ecosystemMenu: {
            populate: {
              item: {
                populate: {
                  child: { populate: { href: true } },
                },
              },
            },
          },
          insightMenu: {
            populate: {
              categories: true,
            },
          },
          aboutMenu: {
            populate: {
              whoWeAre: true,
              navigationItems: true,
              sidebarSections: true,
            },
          },
        },
      });

      // Handle both single object and array response from Strapi
      const data = Array.isArray(layout) ? layout?.[0] : layout;

      // 📦 Log the raw fetched layout data
      console.log('📦 Layout Data:', JSON.stringify(data, null, 2));

      const results = [];

      /**
       * Adds a result if:
       * 1. slug is present
       * 2. Either displayTitle or matchTitle contains the search term
       * displayTitle — what gets returned to the user
       * matchTitle   — optional extra string to match against (e.g. pageTitle)
       */
      const addResult = (
        displayTitle: string | undefined | null,
        slug: string | undefined | null,
        matchTitle?: string | undefined | null
      ) => {
        if (!slug || !displayTitle) return;

        const haystack1 = displayTitle.toLowerCase();
        const haystack2 = matchTitle ? matchTitle.toLowerCase() : '';

        const isMatch =
          haystack1.includes(searchTerm) || haystack2.includes(searchTerm);

        if (!isMatch) return;

        const exists = results.some((r) => r.slug === slug);
        if (!exists) {
          results.push({ title: displayTitle, slug });
        }
      };

      /* =========================
         🔹 SERVICE MENU
      ========================== */
      data?.serviceMenu?.forEach((menu) => {
        // Top-level menu title (e.g. "Enterprise Applications")
        addResult(menu?.title, menu?.footerLink?.slug);

        menu?.items?.forEach((item) => {
          // Match against both item.title and href.pageTitle
          addResult(item?.title, item?.href?.slug, item?.href?.pageTitle);

          item?.child?.forEach((child) => {
            addResult(child?.title, child?.href?.slug, child?.href?.pageTitle);
          });
        });
      });

      /* =========================
         🔹 INDUSTRIES MENU
      ========================== */
      data?.industriesMenu?.forEach((menu) => {
        menu?.sections?.forEach((section) => {
          addResult(
            section?.title,
            section?.href?.slug,
            section?.href?.pageTitle
          );

          section?.items?.forEach((item) => {
            addResult(item?.title, item?.href?.slug, item?.href?.pageTitle);
          });
        });
      });

      /* =========================
         🔹 ECOSYSTEM MENU
      ========================== */
      data?.ecosystemMenu?.forEach((menu) => {
        menu?.item?.child?.forEach((child) => {
          addResult(child?.title, child?.href?.slug, child?.href?.pageTitle);
        });
      });

      /* =========================
         🔹 INSIGHT MENU
      ========================== */
      data?.insightMenu?.categories?.forEach((category) => {
        addResult(category?.title, category?.link);
      });

      /* =========================
         🔹 ABOUT MENU
      ========================== */

      // Who We Are
      addResult(
        data?.aboutMenu?.whoWeAre?.title,
        data?.aboutMenu?.whoWeAre?.link
      );

      // Navigation Items
      data?.aboutMenu?.navigationItems?.forEach((item) => {
        addResult(item?.title, item?.link);
      });

      // Sidebar Sections
      data?.aboutMenu?.sidebarSections?.forEach((section) => {
        addResult(section?.title, section?.link);
      });

      // ✅ Log the final results
      console.log('✅ Search Results:', JSON.stringify(results, null, 2));

      return results;
    } catch (error) {
      strapi.log.error('Global Search Error:', error);
      return ctx.internalServerError('Search failed');
    }
  },

}));

