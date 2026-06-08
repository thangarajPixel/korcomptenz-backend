/**
 * industry-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::industry-lead.industry-lead', {
  config: {
    create: {
      policies: [
        {
          name: 'global::recaptcha',
          config: {
            action: 'industrylead', // must match frontend action
          },
        },
      ],
    },
  },
});
