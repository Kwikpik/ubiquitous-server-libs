import webpush from "web-push";

export const initWebpush = (vapidPublicKey: string, vapidPrivateKey: string) => {
  webpush.setVapidDetails("mailto:support@kwikpik.io", vapidPublicKey, vapidPrivateKey);
  return webpush;
};
