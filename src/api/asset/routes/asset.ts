export default {
  routes: [
    {
      method: 'GET',
      path: '/assets',
      handler: 'asset.find',
    },
    {
      method: 'GET',
      path: '/assets/:id',
      handler: 'asset.findOne',
    },
    {
      method: 'POST',
      path: '/assets',
      handler: 'asset.create',
    },
    {
      method: 'PUT',
      path: '/assets/:id',
      handler: 'asset.update',
    },
    {
      method: 'DELETE',
      path: '/assets/:id',
      handler: 'asset.delete',
    },

    //  CUSTOM ROUTE
    {
      method: 'GET',
      path: '/assets/by-slug/:slug',
      handler: 'asset.findBySlug',
      config: {
        auth: false,
      },
    },
  ],
};
