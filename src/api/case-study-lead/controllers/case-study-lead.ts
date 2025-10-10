/**
 * case-study-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::case-study-lead.case-study-lead', ({ strapi }) => ({
  async create(ctx) {
    if (ctx.request.body.data.caseStudyId) {
      const caseStudy = await strapi.db.query('api::case-study.case-study').findOne({
        where: {
          id: ctx.request.body.data.caseStudyId,
        },
        populate: {
          attachment: true,
        }
      });
      if (caseStudy) {
        const response = await super.create(ctx);
        return { data: { success: true, ...response.data, message: 'Case study lead created successfully', attachment: caseStudy.attachment } };
      }
      return ctx.notFound('Case study not found');
    }
    return ctx.notFound('Case study not found');
  }
}));
