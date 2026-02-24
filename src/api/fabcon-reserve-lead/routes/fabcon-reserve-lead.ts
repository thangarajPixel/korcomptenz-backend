/**
 * fabcon-reserve-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::fabcon-reserve-lead.fabcon-reserve-lead',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'fabconreservelead', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
