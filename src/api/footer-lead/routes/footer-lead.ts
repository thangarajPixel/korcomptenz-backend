/**
 * footer-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::footer-lead.footer-lead', {
  config: {
    create: {
         auth: false,
      policies: [
        {
          name: 'global::recaptcha',
          config: {
            action: 'footerlead', // must match frontend action
          },
        },
      ],
    },
  },
});
