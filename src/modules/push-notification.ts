import {
  type DefaultApi,
  User as OSUser,
  type SubscriptionBody,
  type Subscription,
  Notification as OSNotification,
} from "@onesignal/node-onesignal";
import { configureOSClient } from "../utils/push-notifications";
import { randomUUID } from "crypto";

export interface OSAppConfig {
  appId: string;
  restApiKey: string;
  appName: string;
}

type NotificationMessage = {
  message: string;
  title: string;
  additionalData?: Record<string, any>;
};

type NotificationPayload = Omit<OSNotification, 'app_id'> & {
  appName: string;
  content: NotificationMessage;
  targetType: "subscription_id" | "alias";
  targetData: string[] | { [key: string]: string[] };
  additionalData?: Record<string, any>;
};

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

  async createPNUser(appName: string, aliasLabel: string, aliasId: string, delayMS: number = 8000) {
    const user = new OSUser();

    user.identity = {
      [aliasLabel]: aliasId,
    };

    try {
      const app = this.$apps[appName];
      await app.api.createUser(app.appId, user);
      await delay(delayMS);
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
    token: string,
    delayMS: number = 8000
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
      await delay(delayMS);
      const user = await app.api.getUser(app.appId, aliasLabel, aliasId);
      const s = user.subscriptions.find(sub => sub.token === subscription.subscription.token);
      return s;
    } catch (error) {
      return Promise.reject(error?.response?.data?.errors?.[0]?.title || error?.message || "Unknown error");
    }
  }

  deletePNSubscription(appName: string, subId: string) {
    const app = this.$apps[appName];
    return app.api.deleteSubscription(app.appId, subId);
  }

  async createPN({ appName, content, targetType, targetData, ...payload }: NotificationPayload) {
    const app = this.$apps[appName];
    const { message, title, additionalData } = content;

    const preparedPayload = {
      app_id: app.appId,
      external_id: payload.external_id ?? randomUUID(),
      target_channel: "push",
      contents: {
        en: message,
      },
      headings: {
        en: title,
      },
      data: additionalData ?? {},
    };
    const notification = Object.assign(new OSNotification(), payload, preparedPayload);

    if (targetType === "subscription_id") notification.include_subscription_ids = targetData as string[];
    else notification.include_aliases = targetData as { [key: string]: string[] };

    try {
      const n = await app.api.createNotification(notification);
      return n;
    } catch (error) {
      return Promise.reject(error?.response?.data?.errors?.[0]?.title || error?.message || "Unknown error");
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
