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
    } catch (error: any) {
      throw error;
    }
  }

  async sendVerificationSuccess(to: string | string[], name: string) {
    const template = "verification-successful";

    assert.ok(existsSync(join(__dirname, "/templates", `${template.trim()}.handlebars`)), "template_not_found");

    try {
      const res = await send(to, "Account verification succesful", template, { name });
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async sendKYCStatus(to: string | string[], name: string, status: "successful" | "failed") {
    let template: string = "";

    switch(status) {
      case "successful":
        template = "kyc-failed";
        break;
      case "failed":
        template = "kyc-successful";
        break;
    }

    assert.ok(existsSync(join(__dirname, "/templates", `${template.trim()}.handlebars`)), "template_not_found");

    try {
      const subject = status === "successful" ? "KYC was successful" : "KYC failed";
      const res = await send(to, subject, template, { name });
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async sendPackageState(to: string | string[], name: string, state: "transit" | "delivered", code?: string) {
    let template: string = "";
    
    switch(state) {
      case "transit":
        template = "package-in-transit";
        break;
      case "delivered":
        template = "package-delivered";
        break;
    }

    assert.ok(existsSync(join(__dirname, "/templates", `${template.trim()}.handlebars`)), "template_not_found");

    try {
      const subject = state === "transit" ? "Your package is now in transit" : "Your package has been delivered";
      const res = await send(to, subject, template, { name, code });
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async sendPWChange(to: string | string[], name: string, code: string) {
    const template: string = "change-password";
    assert.ok(existsSync(join(__dirname, "/templates", `${template.trim()}.handlebars`)), "template_not_found");

    try {
      const res = await send(to, "You requested to change your password", template, { name, code });
      return res;
    } catch (error: any) {
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
