import { Transporter } from "nodemailer";
export declare const initializeAndConfigureTransport: (
  email?: string,
  password?: string,
  templatesDir?: string
) => Transporter;
export declare const send: (
  to: string | string[],
  subject: string,
  template: string,
  context: Record<string, any>
) => Promise<any>;
//# sourceMappingURL=mail.d.ts.map
