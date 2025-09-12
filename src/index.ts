// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"], // user model from users-permissions plugin

      async afterCreate(event) {
        const { result } = event;

        const resetToken = strapi
          .service("plugin::users-permissions.jwt")
          .issue({ id: result.id });

        // Save token to user record (required by reset-password endpoint)
        await strapi.db.query("plugin::users-permissions.user").update({
          where: { id: result.id },
          data: { resetPasswordToken: resetToken },
        });

        // Build reset link
        const resetUrl = `http://localhost:1337/reset-password?code=${resetToken}`;

        // Send welcome + reset email
        await strapi
          .service("api::mailer.mailer")
          .sendWelcomeAndReset(result, resetUrl);
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
