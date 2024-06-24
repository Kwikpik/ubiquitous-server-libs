import { SharedHTTPModule } from "../../utils/http";
import { PAYSTACK_SECRET } from "../../variables";

class PalmpayPaymentModule {
  private $: SharedHTTPModule | null = null;

  constructor(secret?: string) {
    const url: string = "https://api.paystack.co";
    const authorization: string = "Bearer ".concat(secret ?? (PAYSTACK_SECRET as string));

    const headers: Record<string, any> = {};

    headers.authorization = authorization;
    headers["Content-Type"] = "application/json";

    this.$ = new SharedHTTPModule(url, headers);
  }
}
