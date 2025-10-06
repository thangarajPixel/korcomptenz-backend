
export default {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/case-study/:slug',
      handler: 'case-study.findOneBySlug',
      auth: false,
    }
  ]
}