/**
 * cloud-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::isg-lead.isg-lead', {
  config: {
    create: {
         auth: false,
      policies: [
        {
          name: 'global::recaptcha',
          config: {
            action: 'isglead', // must match frontend action
          },
        },
      ],
    },
  },
});
