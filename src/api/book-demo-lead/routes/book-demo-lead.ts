/**
 * book-demo-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::book-demo-lead.book-demo-lead',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'bookdemolead', // must match frontend action
            },
          },
        ],
      },
    },
  }
);