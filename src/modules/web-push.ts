import { type RequestOptions, type PushSubscription } from "web-push";
import { initWebpush } from "../utils/web-push";

class WebpushModule {
  private $: ReturnType<typeof initWebpush>;

  constructor(publicKey: string, privateKey: string) {
    this.$ = initWebpush(publicKey, privateKey);
  }

  async sendNotification(subscription: PushSubscription, payload?: string | Buffer, opts?: RequestOptions) {
    try {
      const res = await this.$.sendNotification(subscription, payload, opts);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

export const initializeWebpushModule = (publicKey: string, privateKey: string) =>
  new WebpushModule(publicKey, privateKey);
