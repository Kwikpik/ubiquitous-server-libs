import { HTTPModule } from "../../utils/http";
import { THE_PEER_SECRET } from "../../variables";

interface GeneratePaymentLinkResponse {
    redirect_url: string;
    url: string;
    checkout: {
        id: string;
        amount: number;
        currency: string;
        status: string;
        linked_account: string | null;
        meta: { city: string; state: string };
        updated_at: Date | string;
        created_at: Date | string;
    };
}

interface Transaction {
    type: string;
    transaction: {
        id: string;
        remark: string;
        amount: number;
        charge: number;
        refund: boolean;
        type: string;
        currency: string;
        status: string;
        mode: "credit" | "debit";
        meta: { city: string; state: string };
        reference: string;
        checkout: object | null;
        peer: {
            business: { name: string; logo: string | null; logo_colour: string };
            user: { name: string; identifier: string; identifier_type: string };
        };
        user: {
            name: string;
            identifier: string;
            identifier_type: string;
            email: string;
            reference: string;
            created_at: string | Date;
            updated_at: string | Date;
        };
        channel: "send" | "checkout" | "direct_charge";
        created_at: string | Date;
        updated_at: string | Date;
    };
}

class ThePeerPaymentModule {
    private $: HTTPModule | null;

    constructor(secret?: string) {
        const url = "https://api.thepeer.co";
        const apiKey = secret ?? (THE_PEER_SECRET as string);

        const headers: Record<string, any> = {};

        headers["x-api-key"] = apiKey;
        headers["Content-Type"] = "application/json";

        this.$ = new HTTPModule(url, headers);
    }

    static initializePaymentModule(secret?: string) {
        return new ThePeerPaymentModule(secret);
    }

    async generatePaymentLink(
        userId: string,
        amount: number,
        email: string,
        redirectUrl?: string,
        customerRequest?: Record<string, any>
    ) {
        const body: Record<string, any> = {};

        body.amount = amount * 100;
        body.currency = "NGN";
        body.email = email;
        body.redirect_url = redirectUrl;

        const meta: Record<string, any> = {};

        meta.userId = userId;
        meta.customerRequest = customerRequest;

        body.meta = meta;

        try {
            const res = await this.$.post<any, GeneratePaymentLinkResponse>("/checkout", body);
            return res;
        } catch (error: any) {
            throw error;
        }
    }

    async getTransaction(id: string) {
        try {
            const res = await this.$.get<Transaction>(`/transactions/${id}`);
            return res;
        } catch (error: any) {
            throw error;
        }
    }
}

/**
 * Initialize Flutterwave payment module.
 *
 * @param secret Flutterwave secret key.
 * @returns
 */
export const initFlutterwavePaymentModule = (secret?: string) => ThePeerPaymentModule.initializePaymentModule(secret);
