import hbs from "nodemailer-express-handlebars";
import { join } from "path";
import { createTransport, Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { NM_EMAIL, NM_PASSWORD } from "../variables";
import assert from "assert";
import isNil from "lodash/isNil";

let nm: Transporter | null = null;

const configWithHBS = (directory?: string) => {
  const dir = directory ?? __dirname;

  return hbs({
    viewPath: join(dir, "/templates"),
    viewEngine: {
      partialsDir: join(dir, "/templates"),
      defaultLayout: false,
    },
  });
};

export const initializeAndConfigureTransport = (email?: string, password?: string, templatesDir?: string) => {
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
  nm = createTransport(opts);

  // Configure HBS
  const hbsConfig = configWithHBS(templatesDir);

  nm.use("compile", hbsConfig);

  return nm;
};

export const send = async (to: string | string[], subject: string, template: string, context: Record<string, any>) => {
  assert.ok(!isNil(nm), "nodemailer_uninitialized");
  const opts = { to, subject, context, template, from: "Kwikpik Team <support@kwikpik.io>" };
  try {
    const res = await nm.sendMail(opts);
    return res;
  } catch (error) {
    return await Promise.reject(error);
  }
};
