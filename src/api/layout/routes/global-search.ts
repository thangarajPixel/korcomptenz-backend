export default {
  routes: [
    {
      method: 'GET',
      path: '/layouts/global-search',
      handler: 'layout.globalSearch',
      config: {
        auth: false,
      },
    },
  ],
};