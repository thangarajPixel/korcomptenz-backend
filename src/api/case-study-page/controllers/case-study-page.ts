/**
 * case-study-page controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs';

export default factories.createCoreController('api::case-study-page.case-study-page', ({ strapi }) => ({
  async find(ctx) {
    const populateQuery = qs.stringify({
      populate: {
        relatedCase: true,
        form: {
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
