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
      },
    },
    // email: {
    //   config: {
    //     provider: 'nodemailer',
    //     providerOptions: {
    //       host: env('MAIL_HOST'),
    //       port: Number(env('MAIL_PORT')) || 587,
    //       auth: {
    //         user: env('MAIL_USERNAME'),
    //         pass: env('MAIL_PASSWORD'),
    //       },
    //     },
    //     settings: {
    //       defaultFrom: env('MAIL_DEFAULT_FROM'),
    //       defaultReplyTo: env('MAIL_DEFAULT_REPLY_TO'),
    //     },
    //   },
    // },
  })
};
