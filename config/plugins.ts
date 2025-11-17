// config/plugins.js

module.exports = ({ env }) => {
  return ({
    upload: {
      config: {
        provider: 'strapi-provider-upload-azure-sa',
        providerOptions: {
          account: env('AZURE_ACCOUNT_NAME'),
          serviceBaseURL: env('AZURE_SERVICE_BASE_URL'),
          accountKey: env('AZURE_ACCOUNT_KEY'),
          containerName: env('AZURE_CONTAINER_NAME'),
          defaultPath: env('AZURE_DEFAULT_PATH'),
          azureStorageApiVersion: '2023-11-03',
        },
        // 'image-manipulation': {
        //   enabled: true
        // }
      },
    },
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('MAIL_HOST', 'smtp.example.com'),
          port: env('MAIL_PORT', 587),
          auth: {
            user: env('MAIL_USERNAME'),
            pass: env('MAIL_PASSWORD'),
          },
          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: env('MAIL_FROM', ''),
          defaultReplyTo: env('MAIL_FROM', ''),
        },
      },
    },
  })
};
