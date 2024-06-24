import { ServiceNames } from "../../../constants";
import { SharedHTTPModule } from "../../../utils/http";
import { fillStringPlaceholders } from "../../../utils/mappers";

type AllowedSubEndpoints = "orders" | "products" | "stores" | "admin";

interface AuthHTTPModuleConfig {
  /**
   * Whether to connect via localhost instead.
   */
  shouldUseLocalhost?: boolean;

  /**
   * The port that this service is running on. Defaults to 1700
   */
  port?: number;
}

enum OrderEndpoints {
  GET_BY_ID = "/{id}",
}

enum ProductEndpoints {
  GET_BY_ID = "/single/{id}",
}

enum AdminEndpoints {
  AUTHENTICATE = "/authenticate",
  GET_BY_ID = "/byId/{id}",
}

enum StoreEndpoints {
  GET_BY_ID = "/{id}",
}

class HTTPModule {
  private $: SharedHTTPModule;
  constructor(opts: AuthHTTPModuleConfig = { shouldUseLocalhost: false, port: 1800 }) {
    // Set default values
    opts.shouldUseLocalhost = opts.shouldUseLocalhost ?? false;
    opts.port = opts.port ?? 1800;

    const rootUrl: string = `http://${opts.shouldUseLocalhost ? "127.0.0.1" : ServiceNames.MERCHANT}:${opts.port}`;
    this.$ = SharedHTTPModule.constructWithBaseURL(rootUrl);
  }

  /**
   *  Authenticate an admin
   * @param jwt JSON web token for authentication.
   * @returns
   */
  async authenticate<T>(jwt: string) {
    const headers: Record<string, any> = {};

    headers.authorization = `Bearer ${jwt}`;

    const fullPath = "admin" + "/" + AdminEndpoints.AUTHENTICATE;
    const res = await this.$.get<T>(fullPath, headers);
    return res;
  }

  async retrieveById<T>(subEndpoint: AllowedSubEndpoints, id: string) {
    let path: string = "";

    switch (subEndpoint) {
      case "orders":
        path = OrderEndpoints.GET_BY_ID;
        break;
      case "products":
        path = ProductEndpoints.GET_BY_ID;
        break;
      case "stores":
        path = StoreEndpoints.GET_BY_ID;
        break;
      case "admin":
        path = AdminEndpoints.GET_BY_ID;
        break;
    }

    const fullPath = subEndpoint + "/" + fillStringPlaceholders(path, { id });
    const res = await this.$.get<T>(fullPath);
    return res;
  }
}

/**
 *
 * @param opts HTTP module configuration. {@link AuthHTTPModuleConfig | See implementation}.
 * @returns
 */
export const initializeHTTPModule = (opts?: AuthHTTPModuleConfig) => new HTTPModule(opts);
