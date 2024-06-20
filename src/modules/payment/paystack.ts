import assert from "assert";
import { SharedHTTPModule } from "../../shared/http";
import { PAYSTACK_SECRET } from "../../variables";

class PaystackPaymentModule {
  private $: SharedHTTPModule | null = null;

  constructor(secret?: string) {
    const url: string = "https://api.paystack.co";
    const authorization: string = "Bearer ".concat(secret ?? (PAYSTACK_SECRET as string));

    const headers: Record<string, any> = {};

    headers.authorization = authorization;

    this.$ = new SharedHTTPModule(url, headers);
  }

  private checkHTTPModule() {
    assert.ok(!!this.$, "http_module_uninitialized");
  }

  checkChargeUsingPin(pin: string, reference: string) {
    this.checkHTTPModule();
    return this.$.post("/charge/submit_pin", { pin, reference });
  }
}

/**
 *
 * @param secret Paystack secret key
 * @returns
 */
export const initPaystackPayment = (secret?: string) => new PaystackPaymentModule(secret);
