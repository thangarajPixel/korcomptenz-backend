/**
 * home controller
 */

import { factories } from '@strapi/strapi'
import qs from 'qs';
export default factories.createCoreController('api::home.home', ({ strapi }) => ({
    async find(ctx) {
        console.log(ctx.query, 'ctx');
        const populateQuery = qs.stringify({
            populate: {
                weAreKorcomptenzSection: {
                    populate: {
                        image: true,
                    },
                },
            },
        }, {
            encode: false,
        })

        ctx.query = {
            ...ctx.query,
            ...qs.parse(populateQuery),
        };

        // Calling the default core action
        const { data, meta } = await super.find(ctx);
        return { data: { ...data }, meta };
    }
}));
