/**
 * case-study router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::case-study.case-study', {
  config: {
    findOneBySlug: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
  only: ['find', 'findOne', 'findOneBySlug'],
  except: [],
  prefix: '',
});
