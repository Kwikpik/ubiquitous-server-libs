import {
    type DefaultApi,
    User as OSUser,
    type SubscriptionBody,
    type Subscription,
    Notification as OSNotification,
} from "@onesignal/node-onesignal";
import { configureOSClient } from "../utils/push-notifications";
import { randomUUID } from "crypto";

class LocalPNInstance {
    private $pnApi: DefaultApi;
    private appId: string;

    constructor(restApiKey: string, appId: string) {
        this.$pnApi = configureOSClient(restApiKey);
        this.appId = appId;
    }

    static createLocalPNInstance(appId: string, restApiKey: string) {
        return new LocalPNInstance(restApiKey, appId);
    }

    async createPNUser(aliasLabel: string, aliasId: string) {
        const user = new OSUser();

        user.identity = {
            [aliasLabel]: aliasId,
        };

        try {
            const u = await this.$pnApi.createUser(this.appId, user);
            return {
                id: u.identity![aliasLabel],
            };
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    async createPNSubscription(
        aliasLabel: string,
        aliasId: string,
        type:
            | "ios"
            | "android"
            | "chrome"
            | "windows"
            | "firefox"
            | "safari"
            | "huawei"
            | "chrome-extension"
            | "fireos"
            | "macos",
        token: string
    ) {
        let subscription: SubscriptionBody = {};

        switch (type) {
            case "ios": {
                const siOs: Subscription = {
                    type: "iOSPush",
                    token,
                };
                subscription.subscription = siOs;
                break;
            }
            case "android": {
                const sAndroid: Subscription = {
                    type: "AndroidPush",
                    token,
                };
                subscription.subscription = sAndroid;
                break;
            }
            case "chrome": {
                const sChrome: Subscription = {
                    type: "ChromePush",
                    token,
                };
                subscription.subscription = sChrome;
                break;
            }
            case "windows": {
                const sWindows: Subscription = {
                    type: "WindowsPush",
                    token,
                };
                subscription.subscription = sWindows;
                break;
            }
            case "firefox": {
                const sFireFox: Subscription = {
                    type: "FirefoxPush",
                    token,
                };
                subscription.subscription = sFireFox;
                break;
            }
            case "safari": {
                const sSafari: Subscription = {
                    type: "SafariPush",
                    token,
                };
                subscription.subscription = sSafari;
                break;
            }
            case "huawei": {
                const sHuawei: Subscription = {
                    type: "HuaweiPush",
                    token,
                };
                subscription.subscription = sHuawei;
                break;
            }
            case "chrome-extension": {
                const sChromeExtension: Subscription = {
                    type: "ChromeExtensionPush",
                    token,
                };
                subscription.subscription = sChromeExtension;
                break;
            }
            case "fireos": {
                const sFireOS: Subscription = {
                    type: "FireOSPush",
                    token,
                };
                subscription.subscription = sFireOS;
                break;
            }
            case "macos": {
                const sMacOS: Subscription = {
                    type: "macOSPush",
                    token,
                };
                subscription.subscription = sMacOS;
                break;
            }
        }

        try {
            const s = await this.$pnApi.createSubscription(this.appId, aliasLabel, aliasId, subscription);
            return {
                ...s.subscription,
            };
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    deletePNSubscription(subId: string) {
        return this.$pnApi.deleteSubscription(this.appId, subId);
    }

    async createPN(
        content: string,
        heading: string,
        targetType: "subscription_id" | "alias",
        targetData: string[] | { [key: string]: string[] }
    ) {
        const notification = new OSNotification();
        notification.app_id = this.appId;
        notification.external_id = randomUUID();
        notification.target_channel = "push";
        notification.contents = {
            en: content,
        };
        notification.headings = {
            en: heading,
        };

        if (targetType === "subscription_id") notification.include_subscription_ids = targetData as string[];
        else notification.include_aliases = targetData as { [key: string]: string[] };

        try {
            const n = await this.$pnApi.createNotification(notification);
            return n;
        } catch (reason) {
            return Promise.reject(reason);
        }
    }
}

/**
 *
 * @param appId OneSignal application ID
 * @param restApiKey API key
 * @returns
 */
export const initializePNInstance = (appId: string, restApiKey: string) =>
    LocalPNInstance.createLocalPNInstance(appId, restApiKey);
