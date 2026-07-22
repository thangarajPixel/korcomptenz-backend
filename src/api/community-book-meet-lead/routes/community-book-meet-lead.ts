/**
 * community-book-meet-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::community-book-meet-lead.community-book-meet-lead',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'communitybookmeetlead', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
