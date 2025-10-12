import { SMS } from "../constants";
import { initializeSMSSender, send } from "../utils/sms";
import { fillStringPlaceholders } from "../utils/mappers";

class SMSModule {
  constructor(apiKey?: string) {
    initializeSMSSender(apiKey);
  }

  static initializeSMSModule(apiKey?: string) {
    return new SMSModule(apiKey);
  }

  async sendVerificationOTP(to: string | string[], otp: string, user?: string) {
    try {
      const msg = await send(
        to,
        fillStringPlaceholders(SMS.VERIFICATION, {
          user,
          otp,
        })
      );
      return msg;
    } catch (error) {
      throw error;
    }
  }

  async sendWelcomeSMS(to: string | string[], userType: "regular" | "business" | "merchant" | "rider", user?: string) {
    try {
      let txt: SMS = SMS.WELCOME_USER;

      switch (userType) {
        case "regular":
          txt = SMS.WELCOME_USER;
          break;
        case "business":
          txt = SMS.WELCOME_BUSINESS;
          break;
        case "merchant":
          txt = SMS.WELCOME_MERCHANT;
          break;
        case "rider":
          txt = SMS.WELCOME_RIDER;
          break;
      }

      const msg = await send(to, fillStringPlaceholders(txt, { user }));
      return msg;
    } catch (error: any) {
      throw error;
    }
  }

  async sendKYCMessage(to: string | string[], kycState: "submitted" | "accepted" | "rejected", user?: string) {
    try {
      let txt: SMS = SMS.KYC_SUBMITTED;

      switch (kycState) {
        case "submitted":
          txt = SMS.KYC_SUBMITTED;
          break;
        case "accepted":
          txt = SMS.KYC_ACCEPTED;
          break;
        case "rejected":
          txt = SMS.KYC_REJECTED;
          break;
      }

      const msg = await send(to, fillStringPlaceholders(txt, { user }));
      return msg;
    } catch (error: any) {
      throw error;
    }
  }

  async sendChangePasswordMessage(to: string | string[], code: string, user?: string) {
    try {
      const msg = await send(to, fillStringPlaceholders(SMS.PASSWORD_CHANGE_OTP, { user, code }));
      return msg;
    } catch (error: any) {
      throw error;
    }
  }

  async sendChangePhoneNumberMessage(to: string | string[], code: string, user?: string) {
    try {
      const msg = await send(to, fillStringPlaceholders(SMS.PHONE_NUMBER_CHANGE_OTP, { user, code }));
      return msg;
    } catch (error: any) {
      throw error;
    }
  }

  async sendPackageProtectionCode(to: string | string[], code: string, user?: string) {
    try {
      const msg = await send(to, fillStringPlaceholders(SMS.PACKAGE_PROTECTION_CODE, { user, code }));
      return msg;
    } catch (error: any) {
      throw error;
    }
  }

  async sendExternalPhoneNumberVerificationMessage(to: string | string[], code: string, user?: string) {
    try {
      const msg = await send(to, fillStringPlaceholders(SMS.EXTERNAL_VERIFICATION, { user, code }));
      return msg;
    } catch (error: any) {
      throw error;
    }
  }

  async sendOfflineRequestPin(to: string | string[], code: string, user?: string) {
    try {
      const msg = await send(to, fillStringPlaceholders(SMS.OFFLINE_REQUEST_PIN, { user, code }));
      return msg;
    } catch (error: any) {
      throw error;
    }
  }
}

/**
 *
 * @param apiKey API key.
 * @returns
 */
export const initializeSMSModule = (apiKey?: string) => SMSModule.initializeSMSModule(apiKey);
