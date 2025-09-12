import "@strapi/types";

declare module "@strapi/types" {
  export interface Shared {
    services: {
      // 👇 Register your custom service here
      "api::mailer.mailer": {
        sendWelcomeAndReset(user: any, resetUrl: string): Promise<void>;
      };
    };
  }
}
