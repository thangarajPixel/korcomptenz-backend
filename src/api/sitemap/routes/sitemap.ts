export default {
  routes: [
    {
      method: 'GET',
      path: '/sitemap',
      handler: 'sitemap.index',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/sitemap/categorized',
      handler: 'sitemap.categorized',
      config: { auth: false },
    },
  ],
};
