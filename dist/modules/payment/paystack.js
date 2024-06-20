"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPaystackPayment = void 0;
var assert_1 = __importDefault(require("assert"));
var http_1 = require("../../shared/http");
var variables_1 = require("../../variables");
var PaystackPaymentModule = /** @class */ (function () {
  function PaystackPaymentModule(secret) {
    this.$ = null;
    var url = "https://api.paystack.co";
    var authorization = "Bearer ".concat(secret !== null && secret !== void 0 ? secret : variables_1.PAYSTACK_SECRET);
    var headers = {};
    headers.authorization = authorization;
    this.$ = new http_1.SharedHTTPModule(url, headers);
  }
  PaystackPaymentModule.prototype.checkHTTPModule = function () {
    assert_1.default.ok(!!this.$, "http_module_uninitialized");
  };
  PaystackPaymentModule.prototype.checkChargeUsingPin = function (pin, reference) {
    this.checkHTTPModule();
    return this.$.post("/charge/submit_pin", { pin: pin, reference: reference });
  };
  return PaystackPaymentModule;
})();
/**
 *
 * @param secret Paystack secret key
 * @returns
 */
var initPaystackPayment = function (secret) {
  return new PaystackPaymentModule(secret);
};
exports.initPaystackPayment = initPaystackPayment;
