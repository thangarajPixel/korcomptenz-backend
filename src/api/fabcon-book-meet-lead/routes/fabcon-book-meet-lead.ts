/**
 * fabcon-book-meet-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::fabcon-book-meet-lead.fabcon-book-meet-lead',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'fabconbookmeetlead', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
