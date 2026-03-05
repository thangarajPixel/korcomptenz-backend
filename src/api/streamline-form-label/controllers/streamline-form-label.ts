/**
 * streamline-form-label controller
 */

/**
 * streamline-form-label controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::streamline-form-label.streamline-form-label',
  ({ strapi }) => ({
    async find(ctx) {
      const entities = await strapi.entityService.findMany(
        'api::streamline-form-label.streamline-form-label',
        {
          filters: {
            active: 'true'
          },
          populate: {
            formLabel: {
              on: {
                'form-fields.streamline-form': true
              }
            }
          }
        }
      );

      const sanitized = await this.sanitizeOutput(entities, ctx);
      return this.transformResponse(sanitized);
    },

    async findOne(ctx) {
      const { id } = ctx.params;

      const entity = await strapi.entityService.findOne(
        'api::streamline-form-label.streamline-form-label',
        id,
        {
          populate: {
            formLabel: {
              on: {
                'form-fields.streamline-form': true
              }
            }
          }
        }
      );

      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    },

    async findMany(ctx) {
      const entities = await strapi.entityService.findMany(
        'api::streamline-form-label.streamline-form-label',
        {
          populate: {
            formLabel: {
              on: {
                'form-fields.streamline-form': true
              }
            }
          }
        }
      );

      const sanitized = await this.sanitizeOutput(entities, ctx);
      return this.transformResponse(sanitized);
    }
  })
);