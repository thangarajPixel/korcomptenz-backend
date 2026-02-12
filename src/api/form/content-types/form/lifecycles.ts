//lifecycles.ts

import { errors } from '@strapi/utils';

export default {
  async beforeCreate(event) {
    validateEmailTemplates(event.params.data);
  },

  async beforeUpdate(event) {
    validateEmailTemplates(event.params.data);
  },
};

function validateEmailTemplates(data) {
  if (!data.forms) {
    throw new errors.ApplicationError('Forms field is required');
  }

  const emailTemplateCount = data.forms.filter(
    component => component.__component === 'email-template.email-template'
  ).length;

  if (emailTemplateCount !== 2) {
    throw new errors.ApplicationError(
      ` Two email template  are required. Found ${emailTemplateCount}.`
    );
  }
}