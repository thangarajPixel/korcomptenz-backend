export default ({ env }) => {
  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "connect-src": ["'self'", "https:"],
            "img-src": [
              "'self'",
              "data:",
              "blob:",
              "https://market-assets.strapi.io", // Required for Strapi >= 4.10.6; you can remove it otherwise
              env('AZURE_SERVICE_BASE_URL'),
            ],
            "media-src": [
              "'self'",
              "data:",
              "blob:",
              env('AZURE_SERVICE_BASE_URL'),
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    {
      name: 'strapi::cors',
      config: {
        origin: env('API_ALLOW_ORIGIN', ['*'])
          ?.split(',')
          ?.map((o) => o.trim()),
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        keepHeaderOnError: true,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
}

