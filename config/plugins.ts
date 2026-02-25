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

    //smtp using app password

    // email: {
    //   config: {
    //     provider: 'nodemailer',
    //     providerOptions: {
    //       host: env('MAIL_HOST'),
    //       port: env.int('MAIL_PORT'),
    //       secure: true,
    //       auth: {
    //         user: env('MAIL_USERNAME'),
    //         pass: env('MAIL_PASSWORD'),
    //       },
    //     },
    //     settings: {
    //       defaultFrom: env('MAIL_FROM', 'info@korcomptenz.com'),
    //       defaultReplyTo: env('MAIL_FROM', 'info@korcomptenz.com'),
    //     },
    //   },
    // },



    // SMTP RELAY without auth

    // email: {
    //   config: {
    //     provider: 'nodemailer',
    //     providerOptions: {
    //       host: 'smtprelay.korcomptenz.com',
    //       port: 25,
    //       secure: false, //  false for port 25
    //       tls: {
    //         rejectUnauthorized: true,
    //       },


    //     },
    //     settings: {
    //       defaultFrom: env('MAIL_FROM', 'info@korcomptenz.com'),
    //       defaultReplyTo: env('MAIL_FROM', 'info@korcomptenz.com'),
    //     },
    //   },
    // },



    //  sendgrid [provider nodemailer]

    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('MAIL_HOST'),
          port: env.int('MAIL_PORT'),
          secure: false, //  false for 2525
          auth: {
            user: 'apikey',
            pass: env('SENDGRID_API_KEY'),
          },
        },
        settings: {
          defaultFrom: env('MAIL_FROM', 'info@korcomptenz.com'),
          defaultReplyTo: env('MAIL_FROM', 'info@korcomptenz.com'),
        },
      },
    },



    // sendgrid [provider @strapi/provider-email-sendgrid]

    // email: {
    //   config: {
    //     provider: '@strapi/provider-email-sendgrid', // Use the installed provider
    //     providerOptions: {
    //       apiKey: env('SENDGRID_API_KEY'),
    //     },
    //     settings: {
    //       defaultFrom: env('MAIL_FROM', 'info@korcomptenz.com'),
    //       defaultReplyTo: env('MAIL_FROM', 'info@korcomptenz.com'),
    //       timeout: 1000000,
    //     },
    //   },
    // },
  });
};
