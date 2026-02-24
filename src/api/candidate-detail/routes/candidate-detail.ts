/**
 * candidate-detail router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::candidate-detail.candidate-detail',
  {
    config: {
      create: {
        policies: [
          {
            name: 'global::recaptcha',
            config: {
              action: 'candidatedetail', // must match frontend action
            },
          },
        ],
      },
    },
  }
);
