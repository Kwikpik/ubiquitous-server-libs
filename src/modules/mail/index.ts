import assert from "assert";
import { join } from "path";
import { initializeAndConfigureTransport, send } from "../../utils/mail";
import { existsSync } from "fs";

type UserType = "regular" | "business" | "merchant" | "rider";

class MailingModule {
  constructor(email?: string, password?: string) {
    initializeAndConfigureTransport(email, password, __dirname);
  }

  static initializeMailingModule(email?: string, password?: string) {
    return new MailingModule(email, password);
  }

  async sendAccountVerificationOTP(to: string | string[], userType: UserType, name: string, otp: string) {
    let template: string = "";

    switch (userType) {
      case "regular":
        template = "user-account-verification";
        break;
      case "business":
        template = "business-account-verification";
        break;
      case "merchant":
        template = "merchant-account-verification";
        break;
      case "rider":
        template = "rider-account-verification";
        break;
      default:
        break;
    }

    assert.ok(existsSync(join(__dirname, "/templates", `${template.trim()}.handlebars`)), "template_not_found");

    try {
      const res = await send(to, "Verify your account", template, { otp, name });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async sendVerificationSuccess(to: string | string[], name: string) {
    const template = "verification-successful";

    try {
      const res = await send(to, "Account verification succesful", template, { name });
      return res;
    } catch (error) {
      throw error;
    }
  }
}

/**
 *
 * @param email Zoho email
 * @param password Zoho password
 * @returns
 */
export const initializeMailingModule = (email?: string, password?: string) =>
  MailingModule.initializeMailingModule(email, password);
