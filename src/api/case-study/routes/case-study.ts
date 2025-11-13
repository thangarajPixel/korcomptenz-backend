/**
 * case-study router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::case-study.case-study', {
  config: {
    findFilter: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
  only: ['find', 'findOne', 'findFilter', 'essential', 'search'],
  except: [],
  prefix: '',
});
