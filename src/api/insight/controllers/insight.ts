/**
 * insight controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::insight.insight', ({ strapi }) => ({
  async bulkCreate(ctx) {
    try {
      console.log(ctx.request.body.data, 'ctx.request.body.data');
      const createdRecords = await Promise.all(
        ctx.request.body.data.map(async (item) => {
          return await strapi.service('api::insight-category.insight-category').create({
            data: item,
          });
        })
      );

      return {
        data: {
          success: true,
          message: 'Records uploaded successfully',
          count: createdRecords.length,
          records: createdRecords
        }
      };
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
