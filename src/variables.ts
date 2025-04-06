import { config } from "dotenv";

config();

export const TERMII_API_KEY = process.env.TERMII_API_KEY;
export const NM_EMAIL = process.env.NM_EMAIL;
export const NM_PASSWORD = process.env.NM_PASSWORD;
export const NM_HOST = process.env.NM_HOST;
export const NM_PORT = process.env.NM_PORT as unknown as number;
export const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;
export const PALMPAY_APP_ID = process.env.PALMPAY_APP_ID;
export const FLUTTERWAVE_SECRET = process.env.FLUTTERWAVE_SECRET;
export const THE_PEER_SECRET = process.env.THE_PEER_SECRET;
