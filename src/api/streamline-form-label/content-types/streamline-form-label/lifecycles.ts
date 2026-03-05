// import { errors } from '@strapi/utils';

// const { ApplicationError } = errors;

// export default {
//   async beforeCreate(event) {
//     const { data } = event.params;

//     if (data.active === 'true') {
//       const existing = await strapi.db.query(
//         'api::streamline-form-label.streamline-form-label'
//       ).findOne({
//         where: { active: 'true' },
//       });

//       if (existing) {
//         throw new ApplicationError(
//           'Active fromlabel already exists. Only one can be active at a time.'
//         );
//       }
//     }
//   },

//   async beforeUpdate(event) {
//     const { data, where } = event.params;

//     if (data.active === 'true') {
//       const current = await strapi.db.query(
//         'api::streamline-form-label.streamline-form-label'
//       ).findOne({
//         where: { id: where.id },
//       });

//       const existing = await strapi.db.query(
//         'api::streamline-form-label.streamline-form-label'
//       ).findOne({
//         where: {
//           active: 'true',
//           id: { $ne: current?.id },
//         },
//       });

//       if (existing) {
//         throw new ApplicationError(
//           'Active fromlabel already exists. Only one can be active at a time.'
//         );
//       }
//     }
//   }
// };