import { config } from "dotenv";

config();

export const TERMII_API_KEY = process.env.TERMII_API_KEY;
export const NM_EMAIL = process.env.NM_EMAIL;
export const NM_PASSWORD = process.env.NM_PASSWORD;
