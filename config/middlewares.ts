export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  // 'strapi::security',
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
            "dl.airtable.com", // Required for Strapi < 4.10.6; you can remove it otherwise
            "https://market-assets.strapi.io", // Required for Strapi >= 4.10.6; you can remove it otherwise

            /**

             * Note: If using a STORAGE_URL, replace `https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net` with `process.env.STORAGE_URL`.

             * If using a CDN URL, make sure to include that URL in the CSP headers, e.g., `process.env.STORAGE_CDN_URL`.

             */

            `${process.env.AZURE_SERVICE_BASE_URL}`,

          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com", // Required for Strapi < 4.10.6; you can remove it otherwise
            /**

             * Note: If using a STORAGE_URL, replace `https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net` with `process.env.STORAGE_URL`.

             * If using a CDN URL, make sure to include that URL in the CSP headers, e.g., `process.env.STORAGE_CDN_URL`.

             */
            `${process.env.AZURE_SERVICE_BASE_URL}`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: env('API_ALLOW_ORIGIN', ['*']), // Allow all origins
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
