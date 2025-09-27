import fs from "fs";
import path from "path";
import handlebars from "handlebars";

interface MailerData {
  username: string;
  resetUrl: string;
}

export default {
  async sendWelcomeAndReset(user: any, resetUrl: string) {
    const templatePath = path.join(
      process.cwd(),
      "public/email-templates/welcome-reset.html"
    );

    const source = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(source);

    const html = template({
      username: user.username,
      resetUrl,
    } as MailerData);

    await strapi
      .plugin("email")
      .service("email")
      .send({
        to: user.email, // or result.email if you want to welcome the user
        from: strapi.config.get("plugin.email.settings.defaultFrom"),
        subject: "Your Account Has Been Created",
        html,
      });
  },
};
