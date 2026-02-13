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
  bootstrap(app: any) {
    document.title = "Korcomptenz";
    const updateTitle = () => {
      if (document.title.includes('Strapi')) {
        document.title = document.title.replace(/Strapi/gi, 'Korcomptenz');
      }
      // Replace common patterns
      if (document.title === 'Homepage | Korcomptenz') {
        document.title = 'Korcomptenz';
      }
      if (document.title.includes('Content Manager')) {
        document.title = document.title.replace('Content Manager', 'Korcomptenz');
      }
    };

    // Run on initial load
    updateTitle();

    // Watch for title changes using MutationObserver
    const titleElement = document.querySelector('title');
    if (titleElement) {
      const observer = new MutationObserver(updateTitle);
      observer.observe(titleElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    // Also watch on route changes
    setInterval(updateTitle, 500);
  },
};
