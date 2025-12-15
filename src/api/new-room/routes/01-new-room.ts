
export default {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/new-rooms/:slug',
      handler: 'new-room.findOne',
      config: {
        auth: false,
      },
    }
  ]
}