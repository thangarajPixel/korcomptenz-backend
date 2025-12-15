/**
 * new-room controller
 */

import qs from 'qs';
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::new-room.new-room', ({ strapi }) => ({
  async findOne(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        list: {
          on: {
            'new-room.news-description-only': true,
            'new-room.news-title-description-only': true,
            'new-room.compounds-newsroom': {
              populate: {
                heading: true,
                stretchableComponent: {
                  populate: {
                    list: true,
                  }
                },
                thirdSection: {
                  populate: {
                    list: true,
                  }
                },
              }
            },
            'new-room.simple-image-gallery': {
              populate: {
                list: {
                  populate: {
                    image: true,
                  }
                },
              }
            },
            'new-room.news-service': {
              populate: {
                button: true,
                thirdSection: {
                  populate: {
                    list: true,
                  }
                },
              }
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
    const { data, meta } = await super.findOne(ctx);
    return { data: { ...data }, meta };
  }
}));
