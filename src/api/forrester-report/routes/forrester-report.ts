/**
 * forrester-report router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::forrester-report.forrester-report',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'forresterreport', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
