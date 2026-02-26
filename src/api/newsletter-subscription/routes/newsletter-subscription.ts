/**
 * newsletter-subscription router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::newsletter-subscription.newsletter-subscription',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'newslettersubscriptions', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
