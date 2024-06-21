export enum ServiceNames {
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

export enum AllowedKafkaTopics {
  MERCHANT_ORDERING = "orders-to-merchant",
  EVENT_MONITOR = "event-monitor",
  WALLET_CREATION = "wallet-creation",
}

export enum HttpResponseTypes {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum HttpStatusCodes {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
}

export enum SMS {
  VERIFICATION = "Dear {user}, \n Thank you for signing up with Kwikpik. To ensure that you now have access to our services, verify your account using the code {otp}",
  WELCOME_USER = "Dear {user}, \n Your account with Kwikpik was successfully verified. Now, you can enjoy all the benefits of being a Kwikpik user.",
  WELCOME_RIDER = "Dear {user}, \n You have successfully registered to become Kwikpik's logistics partner. Ensure your KYC documents are submitted, and verified, so that you can start earning with us.",
  KYC_SUBMITTED = "Dear {user}, \n Your KYC documents were submitted. Please be patient while they're reviewed by the team.",
  KYC_ACCEPTED = "Dear {user}, \n Your KYC documents were accepted. Welcome aboard the Kwikpik's logistic partnership train.",
  KYC_REJECTED = "Dear {user}, \n Your KYC documents were rejected. Please try again with the necessary documents, so that you can begin earning with Kwikpik.",
  WELCOME_MERCHANT = "Dear {user}, \n You have joined Kwikpik as a merchant. You can now participate in a streamlined delivery experience.",
  WELCOME_BUSINESS = "Dear {user}, \n You have joined Kwikpik as a business. You can now leverage our services in perfecting your delivery business.",
}
