export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  http: {
    serverOptions: {
      timeout: 600000, // Set timeout to 10 minutes (adjust as needed)
    },
  },
});
