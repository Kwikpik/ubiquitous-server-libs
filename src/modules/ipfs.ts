import isBase64 from "is-base64";
import { FormData, File } from "formdata-node";
import { HttpResponseTypes } from "../constants";
import { HTTPModule } from "../utils/http";
import assert from "assert";
import { randomUUID } from "crypto";
import isNil from "lodash/isNil";

export interface IPFSConfig {
  /**
   * Port to connect to.
   */
  port?: number;

  /**
   * If to use localhost instead of Docker environment
   */
  shouldUseLocalhost?: boolean;

  /**
   * Service name to connect with if not localhost
   */
  serviceName?: string;
}

class LocalIPFSInstance {
  private $httpInstance: HTTPModule;

  constructor(opts: IPFSConfig = { port: 5001, shouldUseLocalhost: true, serviceName: "ipfs-service" }) {
    // Set default value;
    opts.port = opts.port ?? 5001;
    opts.shouldUseLocalhost = opts.shouldUseLocalhost ?? true;
    opts.serviceName = opts.serviceName ?? "ipfs-service";

    const baseURL = `http://${opts.shouldUseLocalhost ? "localhost" : opts.serviceName}:${opts.port}`;
    this.$httpInstance = HTTPModule.constructWithBaseURL(baseURL);
  }

  static constructDefault() {
    return new LocalIPFSInstance();
  }

  public async pinWithBase64(base64: string, name?: string, quiet: boolean = false, progress: boolean = true) {
    const isValidBase64 = isBase64(base64);

    assert.ok(isValidBase64, "invalid_base64");

    const buffer = Buffer.from(base64, "base64");
    const data = new FormData();
    const fileName = name ?? `${randomUUID()}-${Date.now()}`;
    const file = new File([buffer], fileName);

    // Append file
    data.append("file", file);

    const params: Record<string, boolean> = {};

    // Append params
    params.pin = true;
    params.quiet = quiet;
    params.progress = progress;

    const ipfsResponse = await this.$httpInstance.post<FormData, string>("/api/v0/add", data, undefined, params);
    if (ipfsResponse.responseType === HttpResponseTypes.FAILED) {
      return Promise.reject(new Error(ipfsResponse.data));
    }
    const response: string[] = ipfsResponse.data.split("\n");
    const hash = response
      .filter(str_1 => str_1.trim().length > 0)
      .map(str_2 => JSON.parse(str_2))
      .filter(obj => !isNil(obj["Hash"]))
      .map(obj_1 => obj_1["Hash"]);
    return {
      ...ipfsResponse,
      data: hash[0] as string,
    };
  }
}

/**
 * Initializes default IPFS instance
 * @returns
 */
export const initializeDefaultIPFSInstance = () => LocalIPFSInstance.constructDefault();

/**
 *
 * @param opts IPFS configuration. {@link IPFSConfig | See implementation}.
 */
export const initializeIPFSInstance = (opts?: IPFSConfig) => new LocalIPFSInstance(opts);
