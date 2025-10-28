import { generate } from "../../utils/generator";
import { HTTPModule } from "../../utils/http";
import { fillStringPlaceholders } from "../../utils/mappers";

export interface BaseResponse {
  code: string;
  description: string;
}

export interface AccessTokenResponse extends BaseResponse {
  data: {
    businessId: string;
    access_token: string;
    refresh_token: string;
    expiresAt: string;
  };
}

export interface AccountBalanceResponse extends BaseResponse {
  data: {
    amount: string;
    currency: string;
    timeCreated: string;
  };
}

export interface CreateVirtualAccountResponse extends BaseResponse {
  data: {
    createdAt: string;
    accountHolderId: string;
    accountRef: string;
    bvn: string;
    accountName: string;
    bankName: string;
    bankAccountNumber: string;
    bankAccountName: string;
    currency: string;
    callbackUrl: string;
    expired: boolean;
  };
}

export interface BankTransferResponse extends BaseResponse {
  data: {
    amount: number;
    meta: {
      merchantTxRef: string;
      api_client_id: string;
      api_account_id: string;
      rrn: string;
    };
    fee: number;
    timeCreated: number;
    id: string;
    type: string;
    status: string;
  };
}

export interface GetTransactionByRefResponse extends BaseResponse {
  data: {
    id: string;
    status: string;
    amount: string;
    fixedCharge: string;
    source: string;
    type: string;
    customerBillerId: string;
    timeCreated: string;
    timeUpdated: string;
    walletCurrency: string;
    walletBalance: string;
    billingVendorReference: string;
    paymentVendorReference: string;
    userId: string;
    ktaSenderName: string;
    ktaSenderAccountNumber: string;
    ktaSenderBankCode: string;
    senderName: string;
    bankCode: string;
    productId: string;
    isAgentTransaction: boolean;
    isInternational: boolean;
    customerCommission: number;
    sessionId: string;
    accountNumber: string;
    bankName: string;
  };
}

export class NombaPaymentModule {
  private $: HTTPModule | null = null;
  private clientId: string = "";
  private clientSecret: string = "";
  private baseUrl: string = ""
  private globalMutableHeaders: Record<string, any>;

  constructor(clientId: string, clientSecret: string, accountId: string, baseUrl?: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseUrl = baseUrl ?? "https://api.nomba.com/v1"

    const headers: Record<string, any> = {};

    headers.accountId = accountId;
    this.globalMutableHeaders = headers;

    this.$ = new HTTPModule(this.baseUrl);

    this.obtainAccessToken = this.obtainAccessToken.bind(this);
  }

  private async obtainAccessToken() {
    const body: Record<string, any> = {};
    body.grant_type = "client_credentials";
    body.client_id = this.clientId;
    body.client_secret = this.clientSecret;

    try {
      const resp = await this.$.post<Record<string, any>, AccessTokenResponse>(
        "/auth/token/issue",
        body,
        this.globalMutableHeaders
      );

      console.log(resp, "response from obtaining token");
      
      if (typeof resp.data === "string") throw new Error(resp.data);
      if (resp.data.code !== "00") throw new Error(resp.data.description);

      return resp.data as AccessTokenResponse;
    } catch (error: any) {
      console.log(error, "error retrieving token");
      
      return Promise.reject(error);
    }
  }

  async getBalance(accountId: string) {
    try {
      const accessTokenResp = await this.obtainAccessToken();      

      const headers: Record<string, any> = this.globalMutableHeaders;
      headers.Authorization = `Bearer ${accessTokenResp.data.access_token}`;

      const urlPath = "/accounts/{accountId}/balance";
      const balanceResp = await this.$.get<AccountBalanceResponse>(fillStringPlaceholders(urlPath, { accountId }));

      if (typeof balanceResp.data === "string") throw new Error(balanceResp.data);
      if (balanceResp.data.code !== "00") throw new Error(balanceResp.data.description);

      return balanceResp.data as AccountBalanceResponse;
    } catch (error: any) {      
      return Promise.reject(error);
    }
  }

  async createVirtualAccount(accountRef: string, accountName: string) {
    const body: Record<string, any> = {};

    body.accountRef = accountRef;
    body.accountName = accountName;

    try {
      const accessTokenResp = await this.obtainAccessToken();
      console.log(accessTokenResp, "access token response");

      const headers: Record<string, any> = this.globalMutableHeaders;
      headers.Authorization = `Bearer ${accessTokenResp.data.access_token}`;

      const resp = await this.$.post<Record<string, any>, CreateVirtualAccountResponse>(
        "/accounts/virtual",
        body,
        headers
      );

      console.log(resp, "errror creating Nomba account");

      if (typeof resp.data === "string") throw new Error(resp.data);
      if (resp.data.code !== "00") throw new Error(resp.data.description);

      return resp.data as CreateVirtualAccountResponse;
    } catch (error: any) {
      console.log(error, "error from Nomba");
      return Promise.reject(error);
    }
  }

  async getTransactionOnParentAccountUsingReference(txRef: string) {
    try {
      const accessTokenResp = await this.obtainAccessToken();

      const headers: Record<string, any> = this.globalMutableHeaders;
      headers.Authorization = `Bearer ${accessTokenResp.data.access_token}`;

      const queryParams: Record<string, any> = {};

      queryParams.transactionRef = txRef;

      const resp = await this.$.get<GetTransactionByRefResponse>("/transactions/accounts/single", headers, queryParams);

      if (typeof resp.data === "string") throw new Error(resp.data);
      if (resp.data.code !== "00") throw new Error(resp.data.description);

      return resp.data as GetTransactionByRefResponse;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async getTransactionOnNonParentAccountUsingReference(accountId: string, txRef: string) {
    try {
      const accessTokenResp = await this.obtainAccessToken();

      const headers: Record<string, any> = this.globalMutableHeaders;
      headers.Authorization = `Bearer ${accessTokenResp.data.access_token}`;

      const queryParams: Record<string, any> = {};

      queryParams.transactionRef = txRef;

      const urlPath = "/transactions/accounts/{accountId}/single";
      const resp = await this.$.get<GetTransactionByRefResponse>(
        fillStringPlaceholders(urlPath, { accountId }),
        headers,
        queryParams
      );

      if (typeof resp.data === "string") throw new Error(resp.data);
      if (resp.data.code !== "00") throw new Error(resp.data.description);

      return resp.data as GetTransactionByRefResponse;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async initiateBankTransfer(
    amount: number,
    accountNumber: string,
    accountName: string,
    bankCode: string,
    reference?: string,
    narration?: string
  ) {
    const body: Record<string, any> = {};

    body.amount = amount;
    body.accountNumber = accountNumber;
    body.accountName = accountName;
    body.bankCode = bankCode;
    body.merchantTxRef =
      reference ?? "KWI:".concat(generate(20, { digits: true, upperCase: true, alphabets: true, specialChar: false }));
    body.senderName = "Kwikpik";
    body.narration = narration;

    try {
      const accessTokenResp = await this.obtainAccessToken();

      const headers: Record<string, any> = this.globalMutableHeaders;
      headers.Authorization = `Bearer ${accessTokenResp.data.access_token}`;

      const resp = await this.$.post<Record<string, any>, BankTransferResponse>("/transfers/bank", body, headers);

      if (typeof resp.data === "string") throw new Error(resp.data);
      if (resp.data.code !== "00") throw new Error(resp.data.description);

      return resp.data as BankTransferResponse;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}

/**
 *
 * @param clientId Client ID gotten from your dashboard
 * @param clientSecret Client secret gotten from your dashboard
 * @param accountId Nomba account ID
 * @returns
 */
export const initNombaPaymentModule = (clientId: string, clientSecret: string, accountId: string, baseUrl?: string) =>
  new NombaPaymentModule(clientId, clientSecret, accountId, baseUrl);
