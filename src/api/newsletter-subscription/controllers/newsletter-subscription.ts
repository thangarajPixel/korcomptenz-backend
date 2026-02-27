/**
 * newsletter-subscription controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::newsletter-subscription.newsletter-subscription',
  () => ({
    async create(ctx) {
      try {
        const response = await super.create(ctx);

        return {
          data: {
            success: true,
            ...response.data,
            message: 'Thank you for subscribing to our newsletter',
          },
        };

      } catch (error) {
        console.log(error);
        return ctx.badRequest(error?.message || 'Something went wrong');
      }
    },
  })
);
