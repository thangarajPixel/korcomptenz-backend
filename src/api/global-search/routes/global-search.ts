export default {
  routes: [
    {
      method: 'GET',
      path: '/global-search',
      handler: 'global-search.search',
      config: {
        auth: false,
      },
    },
  ],
};
