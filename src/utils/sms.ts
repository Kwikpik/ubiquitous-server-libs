import { type MessageResponse, createTermiiAPIInstance } from "@lonely_dev/termii-js";
import { TERMII_API_KEY } from "../variables";
import isNil from "lodash/isNil";
import assert from "assert";

let api: ReturnType<typeof createTermiiAPIInstance> | null = null;

export const initializeSMSSender = (apiKey?: string) => {
  const key = apiKey ?? (TERMII_API_KEY as string);
  api = createTermiiAPIInstance(key);
  return api;
};

export const send = async (to: string | string[], sms: string): Promise<MessageResponse[]> => {
  assert.ok(!isNil(api), "sms_api_not_initialized");

  const isNG =
    (typeof to === "string" && (to.startsWith("+234") || to.startsWith("234"))) ||
    (Array.isArray(to) && to.every(x => x.startsWith("+234") || x.startsWith("234")));
  const from = isNG ? "N-Alert" : "Kwikpik";
  const channel = isNG ? ["dnd", "whatsapp"] : ["generic", "whatsapp"];

  try {
    const res = await Promise.all(
      channel.map(ch => api.messaging({ to, sms, channel: ch as "generic" | "whatsapp" | "dnd", from }).send())
    );
    return res;
  } catch (error) {
    return await Promise.reject(error);
  }
};
