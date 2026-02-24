/**
 * news-room-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::news-room-lead.news-room-lead',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'newsroomlead', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
