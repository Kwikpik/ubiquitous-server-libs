import { ServiceNames } from "../../../constants";
import { SharedHTTPModule } from "../../../shared/http";

type AllowedSubEndpoints = "rider" | "user" | "business" | "merchant";

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

enum Endpoints {
  AUTHENTICATE = "/authenticate",
  GET_BY_ID = "/byId/:id",
}

class HTTPModule {
  private $: SharedHTTPModule;
  constructor(opts: AuthHTTPModuleConfig = { shouldUseLocalhost: false, port: 1700 }) {
    // Set default values
    opts.shouldUseLocalhost = opts.shouldUseLocalhost ?? false;
    opts.port = opts.port ?? 1700;

    const rootUrl: string = `http://${opts.shouldUseLocalhost ? "127.0.0.1" : ServiceNames.AUTHENTICATION}:${
      opts.port
    }`;
    this.$ = SharedHTTPModule.constructWithBaseURL(rootUrl);
  }

  /**
   *
   * @param subEndpoint Allowed sub-endpoint. {@link AllowedSubEndpoints | See possible values}.
   * @param jwt JSON web token for authentication.
   * @returns
   */
  async authenticate<T>(subEndpoint: AllowedSubEndpoints, jwt: string) {
    const headers: Record<string, any> = {};

    headers.authorization = `Bearer ${jwt}`;

    const fullPath = subEndpoint + "/" + Endpoints.AUTHENTICATE;
    const res = await this.$.get<T>(fullPath, headers);
    return res;
  }

  async retrieveById<T>(subEndpoint: AllowedSubEndpoints, id: string) {
    const fullPath = subEndpoint + "/" + Endpoints.GET_BY_ID.replace(":id", id);
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
