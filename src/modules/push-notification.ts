import {
    type DefaultApi,
    User as OSUser,
    type SubscriptionBody,
    type Subscription,
    Notification as OSNotification,
} from "@onesignal/node-onesignal";
import { configureOSClient } from "../utils/push-notifications";
import { randomUUID } from "crypto";

interface OSAppConfig {
    appId: string;
    restApiKey: string;
    appName: string;
}

const delay = async (timeout = 5000) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

class LocalPNInstance {
    private $apps: { [appName: string]: { api: DefaultApi; appId: string } } = {};

    constructor(userAuthKey: string, configs: OSAppConfig[]) {
        configs.forEach(config => {
            this.$apps[config.appName] = {} as any;
            this.$apps[config.appName].api = configureOSClient(userAuthKey, config.restApiKey);
            this.$apps[config.appName].appId = config.appId;
        });
    }

    static createLocalPNInstance(userAuthKey: string, configs: OSAppConfig[]) {
        return new LocalPNInstance(userAuthKey, configs);
    }

    async createPNUser(appName: string, aliasLabel: string, aliasId: string) {
        const user = new OSUser();

        user.identity = {
            [aliasLabel]: aliasId,
        };

        try {
            const app = this.$apps[appName];
            await app.api.createUser(app.appId, user);
            await delay(17000);
            const u = await app.api.getUser(app.appId, aliasLabel, aliasId);
            return {
                id: u.identity?.[aliasLabel],
            };
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    async createPNSubscription(
        appName: string,
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
            subscription.subscription.enabled = true;

            const app = this.$apps[appName];
            await app.api.createSubscription(app.appId, aliasLabel, aliasId, subscription);
            await delay(17000);
            const user = await app.api.getUser(app.appId, aliasLabel, aliasId);
            const s = user.subscriptions.find(sub => sub.token === subscription.subscription.token);
            return s;
        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    deletePNSubscription(appName: string, subId: string) {
        const app = this.$apps[appName];
        return app.api.deleteSubscription(app.appId, subId);
    }

    async createPN(
        appName: string,
        content: string,
        heading: string,
        targetType: "subscription_id" | "alias",
        targetData: string[] | { [key: string]: string[] }
    ) {
        const app = this.$apps[appName];
        const notification = new OSNotification();
        notification.app_id = app.appId;
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
            const n = await app.api.createNotification(notification);
            return n;
        } catch (reason) {
            return Promise.reject(reason);
        }
    }
}

/**
 *
 * @param userAuthKey OneSignal application ID
 * @param configs List of configurations for multiple apps
 * @returns
 */
export const initializePNInstance = (userAuthKey: string, configs: OSAppConfig[]) =>
    LocalPNInstance.createLocalPNInstance(userAuthKey, configs);
