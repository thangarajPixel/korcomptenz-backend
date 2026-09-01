/**
 * insight router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::insight.insight', {
  config: {
    bulkCreate: {
      auth: true,
      policies: [],
      middlewares: [],
    },
    insightFilter: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
  only: ['find', 'findOne', 'bulk-create', 'insight-filter', 'search', 'findByAttachment'],
  except: [],
  prefix: '',
});
