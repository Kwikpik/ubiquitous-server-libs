import { generate } from "../../utils/generator";
import { SharedHTTPModule } from "../../utils/http";
import { FLUTTERWAVE_SECRET } from "../../variables";

interface GeneratePaymentLinkResponse {
  status: "success" | "failed";
  message: string;
  data: {
    link: string;
  };
}

class FlutterwavePaymentModule {
  private $: SharedHTTPModule | null;

  constructor(secret?: string) {
    const url = "https://api.flutterwave.com";
    const authorization = "Bearer " + (secret ?? (FLUTTERWAVE_SECRET as string));

    const headers: Record<string, any> = {};

    headers.authorization = authorization;

    this.$ = new SharedHTTPModule(url, headers);
  }

  static initializePaymentModule(secret?: string) {
    return new FlutterwavePaymentModule(secret);
  }

  async generatePaymentLinkForBusiness(
    businessId: string,
    amount: string,
    currency: string,
    redirectUrl: string,
    customerEmail: string,
    customerName: string,
    customerPhoneNumber: string
  ) {
    const body: Record<string, any> = {};

    body.amount = amount;
    body.currency = currency;
    body.redirect_url = redirectUrl;
    body.tx_ref = "tx_".concat(
      generate(15, {
        digits: true,
        alphabets: true,
        upperCase: true,
      })
    );

    const customer: Record<string, any> = {};

    customer.email = customerEmail;
    customer.name = customerName;
    customer.phoneNumber = customerPhoneNumber;

    const meta: Record<string, any> = {};

    meta.userId = businessId;
    meta.shouldPropagateImmediately = true;

    body.customer = customer;
    body.meta = meta;

    try {
      const res = await this.$.post<any, GeneratePaymentLinkResponse>("/v3/payments", body);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Initialize Flutterwave payment module.
 *
 * @param secret Flutterwave secret key.
 * @returns
 */
export const initFlutterwavePaymentModule = (secret?: string) =>
  FlutterwavePaymentModule.initializePaymentModule(secret);
