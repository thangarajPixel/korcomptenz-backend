/**
 * company-detail controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::company-detail.company-detail', ({ strapi }) => ({
  async find() {
    const service = strapi.service('api::company-detail.company-detail');
    const data = await service.findWithPopulate();
    return { data };
  },
}));
