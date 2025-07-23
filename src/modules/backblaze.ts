import assert from "assert";
import { HTTPModule } from "../utils/http";
import { HttpResponseTypes } from "../constants";
import { createHash, randomUUID } from "crypto";

export interface AuthorizeAccountResponse {
  accountId: string;
  apiInfo: {
    storageApi: {
      absoluteMinimumPartSize: number;
      apiUrl: string;
      allowed: {
        buckets: { id: string; name: string | null }[];
        capabilities: string[];
        namePrefix: string | null;
      };
      downloadUrl: string;
      recommendedPartSize: number;
      s3ApiUrl: string;
    };
    groupsApi: {
      capabilities: string[];
      groupsApiUrl: string;
      infoType: string;
    };
  };
  applicationKeyExpirationTimestamp: number | null;
  authorizationToken: string;
}

export interface GetUploadURLResponse {
  bucketId: string;
  uploadUrl: string;
  authorizationToken: string;
}

export interface CreateBucketResponse {
  accountId: string;
  bucketId: string;
  bucketName: string;
  bucketType: "allPublic" | "allPrivate";
}

export interface UploadFileResponse {
  accountId: string;
  bucketId: string;
  fileId: string;
  fileName: string;
}

export interface BackblazeConfig {
  /**
   * Application key ID for API access
   */
  applicationKeyId: string;
  /**
   * Application key for API access (standard or master)
   */
  applicationKey: string;
  /**
   * Backblaze main URL
   */
  mainUrl?: string;
}

class LocalBackblazeInstance {
  private $httpInstance: HTTPModule;

  constructor(opts: BackblazeConfig) {
    opts.mainUrl = opts.mainUrl ?? "https://api.backblazeb2.com/b2api/v4";
    const accessKey = Buffer.from(`${opts.applicationKeyId}:${opts.applicationKey}`).toString("base64");
    this.$httpInstance = new HTTPModule(opts.mainUrl, { Authorization: `Basic ${accessKey}` });
  }

  static construct(config: BackblazeConfig) {
    return new LocalBackblazeInstance(config);
  }

  // Additional methods for Backblaze functionality can be added here
  private async authorizeAccount(): Promise<AuthorizeAccountResponse> {
    try {
      const response = await this.$httpInstance.get<AuthorizeAccountResponse>("/b2_authorize_account");
      assert.ok(
        response.responseType === HttpResponseTypes.SUCCESS && typeof response.data !== "string",
        "invalid backblaze response"
      );
      return response.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  private async getUploadURL(bucketId: string): Promise<GetUploadURLResponse> {
    try {
      const authorizationResponse = await this.authorizeAccount();
      const response = await this.$httpInstance.get<GetUploadURLResponse>(
        "/b2_get_upload_url",
        { Authorization: authorizationResponse.authorizationToken },
        { bucketId }
      );
      assert.ok(
        response.responseType === HttpResponseTypes.SUCCESS && typeof response.data !== "string",
        "invalid backblaze response"
      );
      return response.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async createBucket(
    accountId: string,
    bucketName: string,
    bucketType: "allPublic" | "allPrivate" = "allPublic"
  ): Promise<CreateBucketResponse> {
    try {
      const authorizationResponse = await this.authorizeAccount();
      const response = await this.$httpInstance.post<any, CreateBucketResponse>(
        "/b2_create_bucket",
        { accountId, bucketName, bucketType },
        { Authorization: authorizationResponse.authorizationToken }
      );
      assert.ok(
        response.responseType === HttpResponseTypes.SUCCESS && typeof response.data !== "string",
        "invalid backblaze response"
      );
      return response.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async uploadFile(bucketId: string, fileContent: Buffer, fileName?: string): Promise<UploadFileResponse> {
    try {
      const uploadUrlResponse = await this.getUploadURL(bucketId);
      fileName = fileName ?? `${Date.now()}-${randomUUID()}`;
      const sha1 = createHash("sha1").update(fileContent).digest("hex");
      const response = await this.$httpInstance.post<any, UploadFileResponse>(
        uploadUrlResponse.uploadUrl,
        fileContent,
        {
          Authorization: uploadUrlResponse.authorizationToken,
          "X-Bz-File-Name": encodeURIComponent(`kwikpik-${bucketId}/${fileName}`),
          "Content-Type": "b2/x-auto",
          "Content-Length": fileContent.length,
          "X-Bz-Content-Sha1": sha1,
        }
      );
      assert.ok(
        response.responseType === HttpResponseTypes.SUCCESS && typeof response.data !== "string",
        "invalid backblaze response"
      );
      return response.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}

/**
 *
 * @param opts Backblaze configuration. {@link BackblazeConfig | See implementation}.
 */
export const initializeBackblazeInstance = (opts: BackblazeConfig) => LocalBackblazeInstance.construct(opts);
