
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::rpa-form.rpa-form', {
  config: {
    create: {
      policies: [
        {
          name: 'global::recaptcha',
          config: {
            action: 'rpaform', 
          },
        },
      ],
    },
  },
});
