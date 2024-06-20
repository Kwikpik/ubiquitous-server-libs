import { type MessageResponse } from "@lonely_dev/termii-js";
export declare const initializeSMSSender: (apiKey?: string) => import("@lonely_dev/termii-js/dist/api").API;
export declare const send: (to: string | string[], sms: string) => Promise<MessageResponse>;
//# sourceMappingURL=sms.d.ts.map
