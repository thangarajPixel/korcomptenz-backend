import type { StrapiApp } from '@strapi/strapi/admin';

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
    info: {
      name: 'korcomptenz-admin',
      displayName: 'Korcomptenz',
    },
    head: {
      title: 'Korcomptenz Admin',
    },
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to Korcomptenz",
        "Auth.form.welcome.subtitle": "Log in to your Korcomptenz account",
        "app.components.LeftMenu.navbrand.title": "Korcomptenz Dashboard",
        "app.components.LeftMenu.navbrand.workplace": "Korcomptenz",
        "app.page.title": "Korcomptenz",
      },
    },

  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
