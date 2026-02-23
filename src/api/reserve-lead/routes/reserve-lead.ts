/**
 * reserve-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::reserve-lead.reserve-lead',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'reserve-lead', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
