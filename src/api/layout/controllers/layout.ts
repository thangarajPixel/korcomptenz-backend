/**
 * layout controller
 */

import { factories } from '@strapi/strapi';
import qs from 'qs';

export default factories.createCoreController('api::layout.layout', ({ strapi }) => ({
  async find(ctx) {
    const companyDetail = await strapi.service('api::company-detail.company-detail').find({
      populate: {
        companyLogo: true,
        companyFullLogo: true,
      },
    })
    const populateQuery = qs.stringify({
      populate: {
        footer: {
          populate: {
            image: true,
            mobile_image: true,
          },
        },
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
    return { data: { ...data, companyDetail }, meta };
  },
})
);
