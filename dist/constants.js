"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCodes = exports.HttpResponseTypes = exports.AllowedKafkaTopics = exports.ServiceNames = void 0;
var ServiceNames;
(function (ServiceNames) {
  ServiceNames["AUTHENTICATION"] = "authentication-service";
  ServiceNames["MERCHANT"] = "merchant-service";
  ServiceNames["WALLET"] = "wallet-service";
  ServiceNames["MISC"] = "miscellaneous-service";
  ServiceNames["MONITORING"] = "monitoring-service";
  ServiceNames["DISPATCH"] = "dispatch-service";
  ServiceNames["IPFS"] = "ipfs-service";
  ServiceNames["MAIN_DB"] = "db";
  ServiceNames["MONITORING_DB"] = "db-monitoring";
  ServiceNames["KAFKA"] = "kafka";
})(ServiceNames || (exports.ServiceNames = ServiceNames = {}));
var AllowedKafkaTopics;
(function (AllowedKafkaTopics) {
  AllowedKafkaTopics["MERCHANT_ORDERING"] = "orders-to-merchant";
  AllowedKafkaTopics["EVENT_MONITOR"] = "event-monitor";
  AllowedKafkaTopics["WALLET_CREATION"] = "wallet-creation";
})(AllowedKafkaTopics || (exports.AllowedKafkaTopics = AllowedKafkaTopics = {}));
var HttpResponseTypes;
(function (HttpResponseTypes) {
  HttpResponseTypes["SUCCESS"] = "SUCCESS";
  HttpResponseTypes["FAILED"] = "FAILED";
})(HttpResponseTypes || (exports.HttpResponseTypes = HttpResponseTypes = {}));
var HttpStatusCodes;
(function (HttpStatusCodes) {
  HttpStatusCodes[(HttpStatusCodes["OK"] = 200)] = "OK";
  HttpStatusCodes[(HttpStatusCodes["CREATED"] = 201)] = "CREATED";
  HttpStatusCodes[(HttpStatusCodes["NOT_FOUND"] = 404)] = "NOT_FOUND";
  HttpStatusCodes[(HttpStatusCodes["INTERNAL_SERVER_ERROR"] = 500)] = "INTERNAL_SERVER_ERROR";
  HttpStatusCodes[(HttpStatusCodes["UNAUTHORIZED"] = 401)] = "UNAUTHORIZED";
  HttpStatusCodes[(HttpStatusCodes["BAD_REQUEST"] = 400)] = "BAD_REQUEST";
  HttpStatusCodes[(HttpStatusCodes["FORBIDDEN"] = 403)] = "FORBIDDEN";
})(HttpStatusCodes || (exports.HttpStatusCodes = HttpStatusCodes = {}));
