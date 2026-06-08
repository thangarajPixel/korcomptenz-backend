/**
 * cloud-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::cloud-lead.cloud-lead', {
  config: {
    create: {
      policies: [
        {
          name: 'global::recaptcha',
          config: {
            action: 'cloudlead', // must match frontend action
          },
        },
      ],
    },
  },
});
