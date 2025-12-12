/**
 * insight-page controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs'

export default factories.createCoreController('api::insight-page.insight-page', ({ strapi }) => ({
  async find(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        relatedCase: true,
        blogSocialPlatform: {
          populate: {
            icon: true,
          },
        },
        blogAiPlatform: {
          populate: {
            icon: true,
          },
        },
        podcastPlatForm: {
          populate: {
            icon: true,
          },
        },
        form: {
          populate: {
            forms: {
              on: {
                'form-fields.free-consultation-form': {
                  populate: {
                    image: true,
                  },
                },
                'form-fields.insight-reserve-spot': true
              }
            }
          }
        },
        webinarForm: {
          populate: {
            forms: true
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
