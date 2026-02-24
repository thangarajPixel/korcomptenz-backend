/**
 * case-study-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::case-study-lead.case-study-lead',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'casestudylead', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
