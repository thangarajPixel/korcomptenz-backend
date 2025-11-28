/**
 * insight service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::insight.insight', ({ strapi }) => ({
  async findFilter(ctx) {
    const filterData = await strapi.service('api::case-study.case-study').getEssential(ctx);
    const category = await strapi.db.query('api::insight-category.insight-category').findMany({
      ...ctx.query,
      filters: {
        ...ctx.query?.filters,
        publishedAt: {
          $ne: null,
        },
      }
    });
    return { filterData, category };
  },
}));
