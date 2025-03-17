import hbs from "nodemailer-express-handlebars";
import { createTransport, Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { NM_EMAIL, NM_PASSWORD } from "../variables";
import assert from "assert";

let nodemailer: Transporter | null = null;

const configWithHBS = (templatesDirectory: string) => {
  return hbs({
    viewPath: templatesDirectory,
    viewEngine: {
      partialsDir: templatesDirectory,
      defaultLayout: false,
    },
  });
};

export const initializeAndConfigureTransport = (
  email?: string,
  password?: string,
  templatesDir: string = __dirname
) => {
  const user = email ?? (NM_EMAIL as string);
  const pass = password ?? (NM_PASSWORD as string);
  const opts: SMTPTransport.Options = {
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  };
  // Initialize transport
  nodemailer = createTransport(opts);

  // Configure HBS
  const hbsConfig = configWithHBS(templatesDir);
  // Use Handlebars as templating engine
  nodemailer.use("compile", hbsConfig);

  const send = async ({
    to,
    subject,
    context,
    template,
  }: {
    to: string | string[];
    subject: string;
    context: Record<string, any>;
    template: string;
  }) => {
    assert.ok(nodemailer !== null, "nodemailer_uninitialized");
    const opts = { to, subject, context, template, from: "Kwikpik Team <support@kwikpik.io>" };
    try {
      return nodemailer.sendMail(opts);
    } catch (error) {
      return await Promise.reject(error);
    }
  };

  return { send };
};
