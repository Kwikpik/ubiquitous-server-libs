import { ServiceNames } from "../../../constants";
import { SharedHTTPModule } from "../../../utils/http";
import { fillStringPlaceholders } from "../../../utils/mappers";

interface AdminHTTPModuleConfig {
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
  GET_BY_ID = "/{id}",
}

class HTTPModule {
  private $: SharedHTTPModule;
  constructor(opts: AdminHTTPModuleConfig = { shouldUseLocalhost: false, port: 1800 }) {
    // Set default values
    opts.shouldUseLocalhost = opts.shouldUseLocalhost ?? false;
    opts.port = opts.port ?? 1800;

    const rootUrl: string = `http://${opts.shouldUseLocalhost ? "127.0.0.1" : ServiceNames.ADMIN}:${opts.port}`;
    this.$ = SharedHTTPModule.constructWithBaseURL(rootUrl);
  }

  /**
   *
   * @param subEndpoint Allowed sub-endpoint. {@link AllowedSubEndpoints | See possible values}.
   * @param jwt JSON web token for authentication.
   * @returns
   */
  async authenticate<T>(jwt: string) {
    const headers: Record<string, any> = {};

    headers.authorization = `Bearer ${jwt}`;

    const res = await this.$.get<T>(Endpoints.AUTHENTICATE, headers);
    return res;
  }

  async retrieveById<T>(id: string) {
    const fullPath = fillStringPlaceholders(Endpoints.GET_BY_ID, { id });
    const res = await this.$.get<T>(fullPath);
    return res;
  }
}

/**
 *
 * @param opts HTTP module configuration. {@link AdminHTTPModuleConfig | See implementation}.
 * @returns
 */
export const initializeHTTPModule = (opts?: AdminHTTPModuleConfig) => new HTTPModule(opts);
