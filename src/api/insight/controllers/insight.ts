/**
 * insight controller
 */

import { factories } from '@strapi/strapi'
import bulkJson from "../../../../public/kore.json";

export default factories.createCoreController('api::insight.insight', ({ strapi }) => ({
  async bulkCreate(ctx) {
    const compileData = (bulkJson as any).map((item) => {
      const commonData = {
        slug: item.slug,
        title: item.title.rendered,
        seo: {
          title: item.yoast_head_json.title,
          description: item.yoast_head_json.description || "",
        },
        heroSection: {
          description: item.yoast_head_json.description || "",
        },
        createdAt: item.date,
        publishedAt: item.date,
      }
      switch (item.categories[0]) {
        // Brochure
        case 194:
          return {
            ...commonData,
            content: "file",
            category: {
              connect: [{ id: 5, isTemporary: true }],
            },
          };
        // Whitepaper
        case 1:
          return {
            ...commonData,
            content: "file",
            category: {
              connect: [{ id: 7, isTemporary: true }],
            },
          };
        // Infographic
        case 91:
          return {
            ...commonData,
            content: "file",
            category: {
              connect: [{ id: 6, isTemporary: true }],
            },
          };
        // eBook
        case 90:
          return {
            ...commonData,
            content: "file",
            category: {
              connect: [{ id: 16, isTemporary: true }],
            },
          };

        // // Webinar
        // case 13:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 19, isTemporary: true }],
        //     },
        //   };
        // // Podcast
        // case 78:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 18, isTemporary: true }],
        //     },
        //   };
        // // Webstories
        // case 1031:
        //   return {
        //     ...commonData,
        //     content: "file",
        //     category: {
        //       connect: [{ id: 15, isTemporary: true }],
        //     },
        //   };
        // Blog
        case 12:
          return {
            ...commonData,
            content: "blog",
            blog: {
              content: item.content.rendered,
            },
            category: {
              connect: [{ id: 12, isTemporary: true }],
            },
          };
        default:
          return null;
      }
    }).filter((item) => item);
    console.log(compileData, 'compileData');
    try {
      const createdRecords = await Promise.all(
        compileData.map(async (item) => {
          return await strapi.service('api::insight.insight').create({
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
  },
  async findFilter(ctx) {
    const entity = await strapi.service('api::insight.insight').findFilter(ctx);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
