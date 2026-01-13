export default ({ env }) => ({
  mail_to_emails: {
    sales: env('SALES_EMAIL'),
    cc: env('CC_EMAIL'),
    hr: env('HR_EMAIL'),
  },
});
