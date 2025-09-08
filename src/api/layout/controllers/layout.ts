/**
 * layout controller
 */

import { factories } from '@strapi/strapi';
import qs from 'qs';

export default factories.createCoreController('api::layout.layout', ({ strapi }) => ({
  async find(ctx) {
    // Get company details using the service method
    const companyDetailService = strapi.service('api::company-detail.company-detail');
    const companyDetail = await companyDetailService.findWithPopulate();

    // Set up layout query
    const populateQuery = qs.stringify({
      populate: {
        footer: {
          populate: {
            image: true,
            mobile_image: true,
          },
        },
        company_detail: true
      },
    }, {
      encode: false,
    });

    ctx.query = {
      ...ctx.query,
      ...qs.parse(populateQuery),
    };

    // Get layout data
    const { data, meta } = await super.find(ctx);

    // Combine layout data with company details
    return {
      data: {
        ...data,
        companyDetail: Array.isArray(companyDetail) ? companyDetail[0] : companyDetail
      },
      meta
    };
  },
})
);
