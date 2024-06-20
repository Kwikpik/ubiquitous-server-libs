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
declare class HTTPModule {
  private $;
  constructor(opts?: AuthHTTPModuleConfig);
  /**
   *
   * @param subEndpoint Allowed sub-endpoint. {@link AllowedSubEndpoints | See possible values}.
   * @param jwt JSON web token for authentication.
   * @returns
   */
  authenticate<T>(
    subEndpoint: AllowedSubEndpoints,
    jwt: string
  ): Promise<
    import("../../../shared/http").ResponseInterface<string> | import("../../../shared/http").ResponseInterface<T>
  >;
  retrieveById<T>(
    subEndpoint: AllowedSubEndpoints,
    id: string
  ): Promise<
    import("../../../shared/http").ResponseInterface<string> | import("../../../shared/http").ResponseInterface<T>
  >;
}
/**
 *
 * @param opts HTTP module configuration. {@link AuthHTTPModuleConfig | See implementation}.
 * @returns
 */
export declare const initializeHTTPModule: (opts?: AuthHTTPModuleConfig) => HTTPModule;
export {};
//# sourceMappingURL=http.d.ts.map
