/**
 * sap-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::sap-lead.sap-lead', {
  config: {
    create: {
      policies: [
        {
          name: 'global::recaptcha',
          config: {
            action: 'saplead', // must match frontend action
          },
        },
      ],
    },
  },
});
