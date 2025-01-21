import { createHash, createSign } from "crypto";
import { HTTPModule } from "../../utils/http";
import { generate } from "../../utils/generator";
import assert from "assert";

export interface PalmpayConfig {
  appId?: string;
  environment?: "test" | "production";
}

class PalmpayPaymentModule {
  private $: HTTPModule | null = null;
  private mutableHeaders: Record<string, any>;

  constructor(config: PalmpayConfig = { appId: "", environment: "production" }) {
    // Set default values
    config.appId = config.appId ?? "";
    config.environment = config.environment ?? "production";

    const url: string =
      config.environment === "production"
        ? "https://open-gw-prod.palmpay-inc.com"
        : "https://open-gw-daily.palmpay-inc.com";
    const authorization: string = "Bearer ".concat(config.appId);

    const headers: Record<string, any> = {};

    headers.authorization = authorization;
    headers.countryCode = "NG";
    headers["Content-Type"] = "application/json";
    headers.accept = "application/json";
    this.mutableHeaders = headers;

    this.$ = new HTTPModule(url, headers);
  }

  private composeSignature(requestBody: Record<string, any>, secret: string) {
    const toSign = Object.keys(requestBody)
      .sort()
      .map(k => `${k}=${requestBody[k].toString().trim()}`)
      .join("&");
    const md5 = createHash("md5").update(toSign).digest("hex").toUpperCase();
    const signature = createSign("sha1WithRSAEncryption")
      .update(md5)
      .sign(secret.split(String.raw`\n`).join("\n"), "base64");
    return signature;
  }

  public async createVirtualAccount(
    virtualAccountName: string,
    licenseNumber: string,
    email: string,
    customerName: string,
    secret: string
  ) {
    const body: Record<string, any> = {};
    const headers: Record<string, any> = {};

    const nonceStr = generate(12);
    const requestTime = Date.now();

    body.virtualAccountName = virtualAccountName;
    body.version = "V2.0";
    body.nonceStr = nonceStr;
    body.identityType = "personal";
    body.requestTime = requestTime;
    body.licenseNumber = licenseNumber;
    body.email = email;
    body.customerName = customerName;

    for (const key of Object.keys(this.mutableHeaders)) {
      headers[key] = this.mutableHeaders[key];
    }

    headers.Signature = this.composeSignature(body, secret);

    try {
      const res = await this.$.post<any, any>("/api/v2/virtual/account/label/create", body, headers);

      assert.ok(res.data.respCode === "00000000", res.data.respMsg);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

/**
 *
 * @param opts Palmpay configuration. {@link PalmpayConfig | See Implementation}.
 * @returns
 */
export const initializePalmpayPaymentModule = (opts?: PalmpayConfig) => new PalmpayPaymentModule(opts);
