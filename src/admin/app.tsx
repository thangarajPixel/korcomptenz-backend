import type { StrapiApp } from '@strapi/strapi/admin';
import type { DocumentActionComponent } from '@strapi/content-manager/strapi-admin';

type ContentManagerApis = { addDocumentAction: (actions: DocumentActionComponent[]) => void };

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
  bootstrap(app: StrapiApp) {
    const apis = app.getPlugin('content-manager').apis as ContentManagerApis;
    const myAction: DocumentActionComponent = (props) => {
      console.log(props, 'props');

      return {
        label: 'My Custom Menu',
        icon: null, // You can provide a React component for an icon
        position: 'table-row',
        onClick: () => {
          alert(`Custom action for document ID: ${props.documentId}`);
        },
      }
    };

    apis.addDocumentAction([myAction])
  },
};
