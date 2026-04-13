export default {
  routes: [
    {
      method: 'GET',
      path: '/sitemap',
      handler: 'sitemap.index',
      config: { auth: false },
    },
  ],
};
