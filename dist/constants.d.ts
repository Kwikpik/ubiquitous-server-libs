export declare enum ServiceNames {
  AUTHENTICATION = "authentication-service",
  MERCHANT = "merchant-service",
  WALLET = "wallet-service",
  MISC = "miscellaneous-service",
  MONITORING = "monitoring-service",
  DISPATCH = "dispatch-service",
  IPFS = "ipfs-service",
  MAIN_DB = "db",
  MONITORING_DB = "db-monitoring",
  KAFKA = "kafka",
}
export declare enum AllowedKafkaTopics {
  MERCHANT_ORDERING = "orders-to-merchant",
  EVENT_MONITOR = "event-monitor",
  WALLET_CREATION = "wallet-creation",
}
export declare enum HttpResponseTypes {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
export declare enum HttpStatusCodes {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
}
//# sourceMappingURL=constants.d.ts.map
