/**
 * page router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::page.page', {
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
