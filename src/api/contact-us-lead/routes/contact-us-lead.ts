/**
 * contact-us-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::contact-us-lead.contact-us-lead',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'contactuslead', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
