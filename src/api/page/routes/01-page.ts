
export default {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/page',
      handler: 'page.findOneBySlug',
      auth: false,
    }
  ]
}