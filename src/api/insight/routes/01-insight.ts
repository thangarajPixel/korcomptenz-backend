
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
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/insight-filter',
      handler: 'insight.findFilter',
      config: {
        auth: false,
      },
    },
  ]
}