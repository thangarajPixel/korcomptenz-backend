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

    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('MAIL_HOST', 'smtp.example.com'),
          port: env('MAIL_PORT', 587),
          auth: {
            user: env('MAIL_USERNAME', undefined),
            pass: env('MAIL_PASSWORD', undefined),
          },
          // secure: false, // Port 25 → no SSL/TLS by default
          // tls: {
          //   rejectUnauthorized: false, // optional, helps avoid cert issues
          // },
          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: env('MAIL_FROM', 'info@korcomptenz.com'),
          defaultReplyTo: env('MAIL_FROM', 'info@korcomptenz.com'),
        },
      },
    },

    //  sendgrid [provider nodemailer]

    // email: {
    //   config: {
    //     provider: 'nodemailer',
    //     providerOptions: {
    //       host: env('MAIL_HOST', undefined),
    //       port: env('MAIL_PORT', undefined),
    //       // host: 'smtp.sendgrid.net',
    //       // port: 587,
    //       secure: true, // true for 465, false for 587
    //       auth: {
    //         user: 'apikey',
    //         pass: env('SENDGRID_API_KEY', undefined)
    //       },
    //     },
    //     settings: {
    //       defaultFrom: env('MAIL_FROM', 'info@korcomptenz.com'),
    //       defaultReplyTo: env('MAIL_FROM', 'info@korcomptenz.com'),
    //     },
    //   },
    // },

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
