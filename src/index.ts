import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

export default {
  register({ strapi }: { strapi: Core.Strapi }) { },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const pdfService = strapi.plugin('strapi-plugin-pdf-creator').service('pdf');
      const originalCreate = pdfService.create.bind(pdfService);

      pdfService.create = async function (ctx: any) {
        try {
          const templateId = ctx.request?.body?.templateId;

          if (templateId) {
            const template = await strapi.db
              .query('plugin::strapi-plugin-pdf-creator.pdf-template')
              .findOne({ where: { id: templateId }, populate: ['file'] });

            const fileUrl = template?.file?.url;

            if (fileUrl?.startsWith('http')) {
              // Fetch HTML content from Azure URL
              const response = await fetch(fileUrl);
              const html = await response.text();

              // Write to local temp file
              const tmpPath = path.join(
                process.cwd(),
                'public',
                'uploads',
                `tmp_template_${templateId}.html`
              );
              fs.writeFileSync(tmpPath, html);

              // Override URL to local path so plugin can read it
              template.file.url = `/uploads/tmp_template_${templateId}.html`;
            }
          }
        } catch (err) {
          strapi.log.error('PDF Creator override error:', err);
        }

        return originalCreate(ctx);
      };

    } catch (err) {
      strapi.log.error('Failed to override pdf-creator service:', err);
    }
  },
};