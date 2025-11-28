/**
 * insight controller
 */

import { factories } from '@strapi/strapi'
import bulkJson from "../../../../public/kore.json";

export default factories.createCoreController('api::insight.insight', ({ strapi }) => ({
  async bulkCreate(ctx) {
    const filterData = (bulkJson as any).filter((item) => item?.categories[0] === 12);


    const compileData = filterData.map((item) => {
      // const parser = new DOMParser();
      // const doc = parser.parseFromString(item.content.rendered, "text/html");

      // const h2Array = Array.from(doc.querySelectorAll("h2"))
      //   .map(h2 => h2.textContent.trim());

      // console.log(h2Array);
      const commonData = {
        slug: item.slug,
        title: item.title.rendered,
        seo: {
          title: item.yoast_head_json.title,
          description: item.yoast_head_json.description,
        },
        heroSection: {
          description: item.yoast_head_json.description,
        },
        createdAt: item.date,
        publishedAt: item.date,
      }
      return {
        ...commonData,
        content: "blog",
        blog: {
          content: item.content.rendered,
        },
      };
    });
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
