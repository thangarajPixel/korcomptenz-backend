// config/plugins.js

module.exports = ({ env }) => {
  return ({
    upload: {
      config: {
        provider: 'strapi-provider-upload-azure-sa',
        providerOptions: {
          account: env('AZURE_ACCOUNT_NAME'),
          // sasToken: env('AZURE_SAS_TOKEN'),
          serviceBaseURL: env('AZURE_SERVICE_BASE_URL'),
          accountKey: env('AZURE_ACCOUNT_KEY'),
          containerName: env('AZURE_CONTAINER_NAME'),
          defaultPath: env('AZURE_DEFAULT_PATH'),
          // cdnBaseURL: env('AZURE_CDN_BASE_URL'),
          // defaultCacheControl: env('AZURE_DEFAULT_CACHE_CONTROL'),
          // removeCN: env('AZURE_REMOVE_CN'),
          // account: env('AZURE_ACCOUNT_NAME'),
          // serviceBaseURL: env('AZURE_BLOB_ENDPOINT'),
        },
      },
    },
  })
};