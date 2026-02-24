/**
 * free-consultation-lead router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::free-consultation-lead.free-consultation-lead',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'freeconsultationleads', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
