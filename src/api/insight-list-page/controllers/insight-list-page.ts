/**
 * insight-list-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::insight-list-page.insight-list-page', ({ strapi }) => ({
  async find(ctx) {
    const [entity, category] = await Promise.all([strapi.service('api::case-study-list.case-study-list').getPopulate(ctx, true),
    strapi.service('api::insight-category.insight-category').find(ctx)
    ]);
    // Calling the default core action
    const { data, meta } = await super.find(entity);
    return { data: { ...data, category: category?.results || [] }, meta };
  },
}));
