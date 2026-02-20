
export default {
  routes: [
    { // Path defined with a URL parameter
      method: 'POST',
      path: '/bulk-create',
      handler: 'insight.bulkCreate',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/insights/by-attachment/:filename',
      handler: 'insight.findByAttachment',
      config: {
        auth: false,

      },
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/insight-filter',
      handler: 'insight.findFilter',
      config: {
        auth: false,
      },
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/insights/:slug',
      handler: 'insight.findOne',
      config: {
        auth: false,
      },
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/insight-search',
      handler: 'insight.search',
      config: {
        auth: false,
      },
    },
  ]
}