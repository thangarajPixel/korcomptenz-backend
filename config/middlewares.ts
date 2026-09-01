export default ({ env }) => {
  return [
    "strapi::logger",
    "strapi::errors",
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
              "https://market-assets.strapi.io",
              env("AZURE_SERVICE_BASE_URL"),
            ],
            "media-src": [
              "'self'",
              "data:",
              "blob:",
              env("AZURE_SERVICE_BASE_URL"),
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    {
      name: "strapi::cors",
      config: {
        origin: env.array("API_ALLOW_ORIGIN", [
          "https://www.korcomptenz.com",
          "https://korcomptenz.com",
        ]),
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
        headers: ["Content-Type", "Authorization", "Origin", "Accept"],
        keepHeaderOnError: true,
      },
    },
    "strapi::poweredBy",
    "strapi::query",
    {
      name: "strapi::body",
      config: {
        jsonLimit: "2mb",
        formLimit: "2mb",
      },
    },
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
    "global::email-blocker",
    "global::api-rate-limit",
  ];
};
