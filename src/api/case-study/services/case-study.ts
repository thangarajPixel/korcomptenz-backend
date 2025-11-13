/**
 * case-study service
 */

import { factories } from '@strapi/strapi';
import { Context } from 'vm';

export default factories.createCoreService('api::case-study.case-study', ({ strapi }) => ({
  async getAllFilter(ctx: Context) {
    const filters: {
      caseStudy?: { id: { $in: number[] }, slug?: { $eq: string } }
    } = {};
    const [businessOutcomes, industries, region, service, technology] =
      await Promise.all([
        strapi.db.query('api::case-business-outcome.case-business-outcome').findMany({
          ...ctx.query,
          filters: {
            ...ctx.query?.filters,
            publishedAt: {
              $ne: null,
            },
          }
        }),
        strapi.db.query('api::case-industry.case-industry').findMany({
          ...ctx.query,
          filters: {
            ...ctx.query?.filters,
            publishedAt: {
              $ne: null,
            },
          }
        }),
        strapi.db.query('api::case-region.case-region').findMany({
          ...ctx.query,
          filters: {
            ...ctx.query?.filters,
            publishedAt: {
              $ne: null,
            },
          }
        }),
        strapi.db.query('api::case-service.case-service').findMany({
          ...ctx.query,
          filters: {
            ...ctx.query?.filters,
            publishedAt: {
              $ne: null,
            },
          }
        }),
        strapi.db.query('api::case-technology.case-technology').findMany({
          ...ctx.query,
          populate: {
            image: true,
          },
          filters: {
            ...ctx.query?.filters,
            publishedAt: {
              $ne: null,
            },
          }
        }),
      ]);

    const entity = {
      businessOutcomes,
      industries,
      region,
      service,
      technology,
    };

    return entity;
  },
  async getEssential(ctx: Context) {
    const [service, technology] =
      await Promise.all([
        strapi.db.query('api::case-service.case-service').findMany({
          ...ctx.query,
          filters: {
            ...ctx.query?.filters,
            publishedAt: {
              $ne: null,
            },
          }
        }),
        strapi.db.query('api::case-technology.case-technology').findMany({
          ...ctx.query,
          populate: {
            image: true,
          },
          filters: {
            ...ctx.query?.filters,
            publishedAt: {
              $ne: null,
            },
          }
        }),
      ]);

    const entity = {
      service,
      technology,
    };

    return entity;
  }
}));
