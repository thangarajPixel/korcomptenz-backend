/**
 * file-upload controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::asset.asset' as any,
  ({ strapi }) => ({

    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          seo: true,
          file: true, // or specific media fields if needed
        },
      };

      return await super.find(ctx);
    },

    async findOne(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          seo: true,
          file: true,
        },
      };

      return await super.findOne(ctx);
    },
    async findBySlug(ctx) {
      const slug = decodeURIComponent(ctx.params.slug);

      if (!slug) {
        return ctx.badRequest('Slug is required');
      }

      const asset = await strapi.db
        .query('api::asset.asset')
        .findOne({
          where: { slug },
          populate: {
            file: true,
            seo: true,
          },
        });

      if (!asset) {
        return ctx.notFound('Asset not found');
      }

      return this.transformResponse(asset);
    }


  })


);
