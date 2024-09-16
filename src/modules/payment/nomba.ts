import { generate } from "../../utils/generator";
import { HTTPModule } from "../../utils/http";
import { fillStringPlaceholders } from "../../utils/mappers";

interface BaseResponse {
    code: string;
    description: string;
}

interface AccessTokenResponse extends BaseResponse {
    data: {
        businessId: string;
        access_token: string;
        refresh_token: string;
        expiresAt: string;
    };
}

interface AccountBalanceResponse extends BaseResponse {
    data: {
        amount: string;
        currency: string;
        timeCreated: string;
    };
}

interface CreateVirtualAccountResponse extends BaseResponse {
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

interface BankTransferResponse extends BaseResponse {
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

class NombaPaymentModule {
    private $: HTTPModule | null = null;
    private clientId: string = "";
    private clientSecret: string = "";
    private globalMutableHeaders: Record<string, any>;

    constructor(clientId: string, clientSecret: string, accountId: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        const url = "https://api.nomba.com/v1";
        const headers: Record<string, any> = {};

        headers.accountId = accountId;
        this.globalMutableHeaders = headers;

        this.$ = new HTTPModule(url);
    }

    private async obtainAccessToken() {
        const body: Record<string, any> = {};
        body.grant_type = "client_credentials";
        body.client_id = this.clientId;
        body.client_secret = this.clientSecret;

        try {
            const resp = await this.$.post<Record<string, any>, AccessTokenResponse>("/auth/token/issue", body);

            if (typeof resp.data === "string") throw new Error(resp.data);

            return resp.data as AccessTokenResponse;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async getBalance(accountId: string) {
        try {
            const accessTokenResp = await this.obtainAccessToken();

            const headers: Record<string, any> = this.globalMutableHeaders;
            headers.Authorization = `Bearer ${accessTokenResp.data.access_token}`;

            const urlPath = "/accounts/{accountId}/balance";
            const balanceResp = await this.$.get<AccountBalanceResponse>(
                fillStringPlaceholders(urlPath, { accountId })
            );

            if (typeof balanceResp.data === "string") throw new Error(balanceResp.data);

            return balanceResp.data as AccountBalanceResponse;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async createVirtualAccount(accountRef: string, accountName: string, currency: string = "NGN") {
        const body: Record<string, any> = {};

        body.accoutRef = accountRef;
        body.accountName = accountName;
        body.currency = currency;

        const TWENTY_FIVE_YEARS = Date.now() + 788400000000;
        const dateString = new Date(TWENTY_FIVE_YEARS).toISOString();

        body.expiryDate = dateString;

        try {
            const accessTokenResp = await this.obtainAccessToken();

            const headers: Record<string, any> = this.globalMutableHeaders;
            headers.Authorization = `Bearer ${accessTokenResp.data.access_token}`;

            const resp = await this.$.post<Record<string, any>, CreateVirtualAccountResponse>(
                "/accounts/virtual",
                body,
                headers
            );

            if (typeof resp.data === "string") throw new Error(resp.data);

            return resp.data as CreateVirtualAccountResponse;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async initiateBankTransfer(
        amount: number,
        accountNumber: string,
        accountName: string,
        bankCode: string,
        narration?: string
    ) {
        const body: Record<string, any> = {};

        body.amount = amount;
        body.accountNumber = accountNumber;
        body.accountName = accountName;
        body.bankCode = bankCode;
        body.merchantTxRef = "KWI:".concat(
            generate(20, { digits: true, upperCase: true, alphabets: true, specialChar: false })
        );
        body.senderName = "Kwikpik";
        body.narration = narration;

        try {
            const accessTokenResp = await this.obtainAccessToken();

            const headers: Record<string, any> = this.globalMutableHeaders;
            headers.Authorization = `Bearer ${accessTokenResp.data.access_token}`;

            const resp = await this.$.post<Record<string, any>, BankTransferResponse>("/transfers/bank", body, headers);

            if (typeof resp.data === "string") throw new Error(resp.data);

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
export const initNombaPaymentModule = (clientId: string, clientSecret: string, accountId: string) =>
    new NombaPaymentModule(clientId, clientSecret, accountId);