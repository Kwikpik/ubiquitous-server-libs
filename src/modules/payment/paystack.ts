import assert from "assert";
import { SharedHTTPModule } from "../../shared/http";
import { PAYSTACK_SECRET } from "../../variables";

class PaystackPaymentModule {
  private httpModule: SharedHTTPModule | null = null;

  constructor(secret?: string) {
    const url: string = "https://api.paystack.co";
    const authorization: string = "Bearer ".concat(secret ?? (PAYSTACK_SECRET as string));

    const headers: Record<string, any> = {};

    headers.authorization = authorization;

    this.httpModule = new SharedHTTPModule(url, headers);
  }

  private checkHTTPModule() {
    assert.ok(!!this.httpModule, "http_module_uninitialized");
  }

  checkChargeUsingPin(pin: string, reference: string) {
    this.checkHTTPModule();
    return this.httpModule.post("/charge/submit_pin", { pin, reference });
  }
}
