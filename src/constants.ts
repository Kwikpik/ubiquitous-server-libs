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
    PHONE_NUMBER_CHANGE_OTP = "Dear {user}, \n You have requested to change your phone number, use the OTP - {code} - to change your phone number.",
    PACKAGE_PROTECTION_CODE = "Dear {user}, \n Your package is now in transit. Send the code - {code} - to the recipient, and ask them to verify with the rider.",
}

export enum Vehicles {
    CAR = "car",
    MOTORCYCLE = "motorcycle",
    BICYCLE = "bicycle",
    BUS = "bus",
    MINI_TRUCK = "mini_truck",
    HEAVY_TRUCK = "heavy_truck",
}
