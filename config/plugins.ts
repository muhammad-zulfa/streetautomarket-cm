export default ({ env }) => ({
  // "location-picker": {
  //   enabled: true,
  //   resolve: "./src/plugins/strapi-location-picker", // Or the correct path to your plugin
  // },
  email: {
    config: {
      provider: "nodemailer", // or 'sendgrid', 'mailgun', etc.
      providerOptions: {
        host: "smtp.gmail.com",
        port: 587, // use 465 if you want SSL
        secure: false, // true for 465, false for 587
        auth: {
          user: env("SMTP_USERNAME"), // your Gmail address
          pass: env("SMTP_PASSWORD"), // your Gmail App Password
        },
      },
      settings: {
        defaultFrom: env("DEFAULT_FROM_EMAIL", "hello@example.com"),
        defaultReplyTo: env("DEFAULT_REPLY_TO_EMAIL", "hello@example.com"),
        // ... provider-specific settings (e.g., apiKey for SendGrid)
      },
    },
  },
});
