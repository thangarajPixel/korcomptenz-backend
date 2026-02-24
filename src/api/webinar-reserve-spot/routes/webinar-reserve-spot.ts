/**
 * webinar-reserve-spot router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::webinar-reserve-spot.webinar-reserve-spot',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'webinarreservelead', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
