import { HttpResponseTypes } from "../constants";
interface IPFSConfig {
  /**
   * Port to connect to.
   */
  port?: number;
  /**
   * If to use localhost instead of Docker environment
   */
  shouldUseLocalhost?: boolean;
}
declare class LocalIPFSInstance {
  private $httpInstance;
  constructor(opts?: IPFSConfig);
  static constructDefault(): LocalIPFSInstance;
  pinWithBase64(
    base64: string,
    name?: string,
    quiet?: boolean,
    progress?: boolean
  ): Promise<{
    data: string;
    responseType: HttpResponseTypes;
    statusCode: import("../constants").HttpStatusCodes;
  }>;
}
/**
 * Initializes default IPFS instance
 * @returns
 */
export declare const initializeDefaultIPFSInstance: () => LocalIPFSInstance;
/**
 *
 * @param opts IPFS configuration. {@link IPFSConfig | See implementation}.
 */
export declare const initializeIPFSInstance: (opts?: IPFSConfig) => LocalIPFSInstance;
export {};
//# sourceMappingURL=ipfs.d.ts.map
