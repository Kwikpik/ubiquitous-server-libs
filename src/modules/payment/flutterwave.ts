import { generate } from "../../utils/generator";
import { HTTPModule } from "../../utils/http";
import { fillStringPlaceholders } from "../../utils/mappers";
import { FLUTTERWAVE_SECRET } from "../../variables";

interface GeneratePaymentLinkResponse {
  status: "success" | "failed";
  message: string;
  data: {
    link: string;
  };
}

class FlutterwavePaymentModule {
  private $: HTTPModule | null;

  constructor(secret?: string) {
    const url = "https://api.flutterwave.com";
    const authorization = "Bearer " + (secret ?? (FLUTTERWAVE_SECRET as string));

    const headers: Record<string, any> = {};

    headers.authorization = authorization;
    headers["Content-Type"] = "application/json";

    this.$ = new HTTPModule(url, headers);
  }

  static initializePaymentModule(secret?: string) {
    return new FlutterwavePaymentModule(secret);
  }

  async verifyTransaction(id: string) {
    try {
      const res = await this.$.get<any>(fillStringPlaceholders("/v3/transactions/{id}/verify", { id }));
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async initiateTransfer(
    accountBank: string,
    accountNumber: string,
    amount: number,
    narration: string,
    currency: string
  ) {
    const body: Record<string, any> = {};

    body.amount = amount;
    body.account_bank = accountBank;
    body.account_number = accountNumber;
    body.currency = currency;
    body.narration = narration;
    body.reference = "transfer_".concat(
      generate(15, {
        digits: true,
        alphabets: true,
        upperCase: true,
      })
    );

    try {
      const res = await this.$.post<any, any>("/v3/transfers", body);
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async generatePaymentLink(
    userId: string,
    amount: string,
    currency: string,
    redirectUrl: string,
    customerEmail: string,
    customerName: string,
    customerPhoneNumber: string,
    customerRequest?: Record<string, any>
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

    meta.userId = userId;
    meta.customerRequest = customerRequest;

    body.customer = customer;
    body.meta = meta;

    try {
      const res = await this.$.post<any, GeneratePaymentLinkResponse>("/v3/payments", body);
      return res;
    } catch (error: any) {
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
