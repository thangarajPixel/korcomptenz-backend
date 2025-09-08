/**
 * company-detail service
 */

import { factories } from '@strapi/strapi';
import qs from 'qs';

export default factories.createCoreService('api::company-detail.company-detail', ({ strapi }) => ({
  async findWithPopulate() {
    const populateQuery = qs.stringify({
      populate: {
        companyLogo: true,
        companyFullLogo: true,
        social_medias: {
          populate: {
            icon: true,
          },
        },
      },
    }, {
      encode: false,
    });

    const data = await strapi.entityService.findMany('api::company-detail.company-detail', {
      ...qs.parse(populateQuery),
    });

    return data;
  },
}));
