import { errors } from '@strapi/utils';

const { ApplicationError } = errors;

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.active === 'true') {
      const existing = await strapi.db.query(
        'api::streamline-form-label.streamline-form-label'
      ).findOne({
        where: {
          active: 'true',
          publishedAt: { $ne: null } // only check published records
        },
      });

      if (existing) {
        throw new ApplicationError(
          'Active form label already exists. Only one can be active at a time.'
        );
      }
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    if (data.active === 'true') {
      const existing = await strapi.db.query(
        'api::streamline-form-label.streamline-form-label'
      ).findOne({
        where: {
          active: 'true',
          publishedAt: { $ne: null }, // only check published records
          $and: [
            { id: { $ne: where.id } } // exclude current record
          ]
        },
      });

      if (existing) {
        throw new ApplicationError(
          'Active form label already exists. Only one can be active at a time.'
        );
      }
    }
  }
};