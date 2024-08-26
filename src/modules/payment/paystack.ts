import { HTTPModule } from "../../utils/http";
import { PAYSTACK_SECRET } from "../../variables";
import { generate } from "../../utils/generator";
import { fillStringPlaceholders } from "../../utils/mappers";

interface GeneratePaymentLinkResponse {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
}

interface CreateTransferRecipientResponse {
    status: boolean;
    message: string;
    data: {
        active: boolean;
        createdAt: Date | string;
        currency: string;
        domain: string;
        id: number;
        integration: number;
        name: string;
        recipient_code: string;
        type: string;
        updatedAt: Date | string;
        is_deleted: boolean;
        details: {
            authorization_code: string | null;
            account_number: string;
            account_name: string;
            bank_code: string;
            bank_name: string;
        };
    };
}

class PaystackPaymentModule {
    private $: HTTPModule | null = null;

    constructor(secret?: string) {
        const url: string = "https://api.paystack.co";
        const authorization: string = "Bearer ".concat(secret ?? (PAYSTACK_SECRET as string));

        const headers: Record<string, any> = {};

        headers.authorization = authorization;
        headers["Content-Type"] = "application/json";

        this.$ = new HTTPModule(url, headers);
    }

    async generatePaymentLink(
        userId: string,
        amount: number,
        email: string,
        currency?: string,
        customerRequest?: Record<string, any>
    ) {
        const body: Record<string, any> = {};

        body.amount = (amount * 100).toString();
        body.email = email;
        body.currency = currency;
        body.reference = "tx_".concat(
            generate(15, {
                digits: true,
                alphabets: true,
                upperCase: true,
            })
        );

        const metadata: Record<string, any> = {};

        metadata.userId = userId;
        metadata.customerRequest = customerRequest;

        try {
            const res = await this.$.post<any, GeneratePaymentLinkResponse>("/transaction/initialize", body);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async verifyTransaction(reference: string) {
        const urlPath = fillStringPlaceholders("/transaction/verify/{reference}", { reference });
        try {
            const res = await this.$.get<any>(urlPath);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async createTransferRecipient(
        type: "nuban" | "mobile_money" | "basa" | "ghipss",
        name: string,
        accountNumber: string,
        bankCode: string,
        currency?: string
    ) {
        try {
            const body: Record<string, any> = {};

            body.type = type;
            body.name = name;
            body.account_number = accountNumber;
            body.bank_code = bankCode;
            body.currency = currency;

            const res = await this.$.post<any, CreateTransferRecipientResponse>("/transferrecipient", body);
            return res;
        } catch (error: any) {
            throw error;
        }
    }

    async bulkCreateTransferRecipient(
        batch: {
            type: "nuban" | "mobile_money" | "basa" | "ghipss";
            name: string;
            accountNumber: string;
            bankCode: string;
            currency?: string;
        }[]
    ) {
        try {
            const body: Record<string, any> = {};

            body.batch = batch.map(item => ({
                type: item.type,
                name: item.name,
                account_number: item.accountNumber,
                bank_code: item.bankCode,
                currency: item.currency,
            }));

            const res = await this.$.post<any, any>("/transferrecipient/bulk", body);
            return res;
        } catch (error: any) {
            throw error;
        }
    }

    async initiateTransfer(amount: number, recipient: string, reason?: string, currency?: string) {
        try {
            const body: Record<string, any> = {};

            body.source = "balance";
            body.amount = amount * 100;
            body.recipient = recipient;
            body.reason = reason;
            body.currency = currency;
            body.reference = "tx_".concat(
                generate(15, {
                    digits: true,
                    alphabets: true,
                    upperCase: false,
                })
            );

            const res = await this.$.post<any, any>("/transfer", body);
            return res;
        } catch (error: any) {
            throw error;
        }
    }

    async initiateBulkTransfer(transfers: { amount: number; recipient: string; reason?: string }[], currency?: string) {
        try {
            const body: Record<string, any> = {};

            body.source = "balance";
            body.currency = currency;
            body.transfers = transfers.map(transfer => ({
                ...transfer,
                amount: transfer.amount * 100,
                reference: "tx_".concat(
                    generate(15, {
                        digits: true,
                        alphabets: true,
                        upperCase: false,
                    })
                ),
            }));

            const res = await this.$.post<any, any>("/transfer/bulk", body);
            return res;
        } catch (error: any) {
            throw error;
        }
    }
}

/**
 *
 * @param secret Paystack secret key
 * @returns
 */
export const initPaystackPaymentModule = (secret?: string) => new PaystackPaymentModule(secret);
