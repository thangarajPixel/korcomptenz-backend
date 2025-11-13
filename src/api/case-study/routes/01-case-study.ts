
export default {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/case-studies/:slug',
      handler: 'case-study.findOne',
      config: {
        auth: false,
      },
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/case-study-filter',
      handler: 'case-study.findFilter',
      config: {
        auth: false,
      },
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/case-study-essential',
      handler: 'case-study.essential',
      config: {
        auth: false,
      },
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/case-study-search',
      handler: 'case-study.search',
      config: {
        auth: false,
      },
    }
  ]
}