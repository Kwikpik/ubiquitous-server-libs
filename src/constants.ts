export enum ServiceNames {
  AUTHENTICATION = "authentication-service",
  MERCHANT = "merchant-service",
  WALLET = "wallet-service",
  MISC = "miscellaneous-service",
  MONITORING = "monitoring-service",
  LOGISTICS = "logistics-service",
  ADMIN = "admin-service",
  IPFS = "ipfs-service",
  MAIN_DB = "db",
  MONITORING_DB = "db-monitoring",
  KAFKA = "kafka",
}

export enum AllowedKafkaTopics {
  MERCHANT_ORDERS = "orders-to-merchants",
  EVENT_MONITOR = "event-monitor",
  WALLET_CREATION = "wallet-creation",
  DISPATCH_ORDER = "dispatch-orders",
  CANCELLED_MERCHANT_ORDERS = "cancelled-orders-to-merchants",
  ACCEPTED_MERCHANT_ORDERS = "accepted-orders-to-merchants",
  REQUEST_PAYMENTS = "payments-for-requests",
  CANCELLED_DISPATCH_ORDERS = "cancelled-dispatch-orders",
  CREDIT_RIDERS = "credit-riders",
  REVENUE_INFO = "revenue-info",
  WITHDRAWAL_REQUESTS = "withdrawal-requests",
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
  PASSWORD_CHANGE_OTP = "Dear {user}, \n You have requested to change your password, use the OTP - {code} - to change your password.",
  PACKAGE_PROTECTION_CODE = "Dear {user}, \n Your package is now in transit. Send the code - {code} - to the recipient, and ask them to verify with the rider.",
}
