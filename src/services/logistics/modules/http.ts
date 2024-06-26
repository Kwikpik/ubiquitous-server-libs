import { ServiceNames } from "../../../constants";
import { SharedHTTPModule } from "../../../utils/http";
import { fillStringPlaceholders } from "../../../utils/mappers";

interface LogisticsHTTPModuleConfig {
  /**
   * Whether to connect via localhost instead.
   */
  shouldUseLocalhost?: boolean;

  /**
   * The port that this service is running on. Defaults to 1700
   */
  port?: number;
}

enum Endpoints {
  GET_BY_ID = "/{id}",
  GET_BY_PAYMENT_REFERENCE = "/reference/{paymentReference}",
}

class HTTPModule {
  private $: SharedHTTPModule;
  constructor(opts: LogisticsHTTPModuleConfig = { shouldUseLocalhost: false, port: 1800 }) {
    // Set default values
    opts.shouldUseLocalhost = opts.shouldUseLocalhost ?? false;
    opts.port = opts.port ?? 1800;

    const rootUrl: string = `http://${opts.shouldUseLocalhost ? "127.0.0.1" : ServiceNames.LOGISTICS}:${opts.port}`;
    this.$ = SharedHTTPModule.constructWithBaseURL(rootUrl);
  }

  async retrieveById<T>(id: string) {
    const fullPath = "/requests" + fillStringPlaceholders(Endpoints.GET_BY_ID, { id });
    const res = await this.$.get<T>(fullPath);
    return res;
  }

  async retrieveByPaymentReference<T>(paymentReference: string) {
    const fullPath = "/requests" + fillStringPlaceholders(Endpoints.GET_BY_PAYMENT_REFERENCE, { paymentReference });
    const res = await this.$.get<T>(fullPath);
    return res;
  }
}

/**
 *
 * @param opts HTTP module configuration. {@link LogisticsHTTPModuleConfig | See implementation}.
 * @returns
 */
export const initializeHTTPModule = (opts?: LogisticsHTTPModuleConfig) => new HTTPModule(opts);
