import { SharedHTTPModule } from "../../shared/http";
import { FLUTTERWAVE_SECRET } from "../../variables";

class FlutterwavePaymentModule {
  private $: SharedHTTPModule | null;

  constructor(secret?: string) {
    const url = "https://api.flutterwave.com";
    const authorization = "Bearer " + (secret ?? (FLUTTERWAVE_SECRET as string));

    const headers: Record<string, any> = {};

    headers.authorization = authorization;

    this.$ = new SharedHTTPModule(url, headers);
  }
}
