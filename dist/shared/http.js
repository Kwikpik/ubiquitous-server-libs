"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedHTTPModule = void 0;
var axios_1 = __importDefault(require("axios"));
var constants_1 = require("../constants");
var SharedHTTPModule = /** @class */ (function () {
  function SharedHTTPModule(baseURL, headers) {
    this.axiosInstance = axios_1.default.create({
      baseURL: baseURL,
      headers: headers,
    });
  }
  SharedHTTPModule.constructWithBaseURL = function (baseURL) {
    return new SharedHTTPModule(baseURL);
  };
  SharedHTTPModule.prototype.post = function (path, body, headers, params) {
    return __awaiter(this, void 0, void 0, function () {
      var res, error_1;
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.axiosInstance.post(path, body, { headers: headers, params: params })];
          case 1:
            res = _c.sent();
            return [
              2 /*return*/,
              { statusCode: res.status, responseType: constants_1.HttpResponseTypes.SUCCESS, data: res.data },
            ];
          case 2:
            error_1 = _c.sent();
            return [
              2 /*return*/,
              {
                statusCode:
                  (_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status) !== null &&
                  _b !== void 0
                    ? _b
                    : constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
                responseType: constants_1.HttpResponseTypes.FAILED,
                data: error_1.message,
              },
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  SharedHTTPModule.prototype.get = function (path, headers, params) {
    return __awaiter(this, void 0, void 0, function () {
      var res, error_2;
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.axiosInstance.post(path, { headers: headers, params: params })];
          case 1:
            res = _c.sent();
            return [
              2 /*return*/,
              { statusCode: res.status, responseType: constants_1.HttpResponseTypes.SUCCESS, data: res.data },
            ];
          case 2:
            error_2 = _c.sent();
            return [
              2 /*return*/,
              {
                statusCode:
                  (_b = (_a = error_2.response) === null || _a === void 0 ? void 0 : _a.status) !== null &&
                  _b !== void 0
                    ? _b
                    : constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
                responseType: constants_1.HttpResponseTypes.FAILED,
                data: error_2.message,
              },
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  SharedHTTPModule.prototype.patch = function (path, body, headers, params) {
    return __awaiter(this, void 0, void 0, function () {
      var res, error_3;
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.axiosInstance.patch(path, body, { headers: headers, params: params })];
          case 1:
            res = _c.sent();
            return [
              2 /*return*/,
              { statusCode: res.status, responseType: constants_1.HttpResponseTypes.SUCCESS, data: res.data },
            ];
          case 2:
            error_3 = _c.sent();
            return [
              2 /*return*/,
              {
                statusCode:
                  (_b = (_a = error_3.response) === null || _a === void 0 ? void 0 : _a.status) !== null &&
                  _b !== void 0
                    ? _b
                    : constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
                responseType: constants_1.HttpResponseTypes.FAILED,
                data: error_3.message,
              },
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  SharedHTTPModule.prototype.put = function (path, body, headers, params) {
    return __awaiter(this, void 0, void 0, function () {
      var res, error_4;
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.axiosInstance.put(path, body, { headers: headers, params: params })];
          case 1:
            res = _c.sent();
            return [
              2 /*return*/,
              { statusCode: res.status, responseType: constants_1.HttpResponseTypes.SUCCESS, data: res.data },
            ];
          case 2:
            error_4 = _c.sent();
            return [
              2 /*return*/,
              {
                statusCode:
                  (_b = (_a = error_4.response) === null || _a === void 0 ? void 0 : _a.status) !== null &&
                  _b !== void 0
                    ? _b
                    : constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
                responseType: constants_1.HttpResponseTypes.FAILED,
                data: error_4.message,
              },
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  SharedHTTPModule.prototype.delete = function (path, headers, params) {
    return __awaiter(this, void 0, void 0, function () {
      var res, error_5;
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.axiosInstance.delete(path, { headers: headers, params: params })];
          case 1:
            res = _c.sent();
            return [
              2 /*return*/,
              { statusCode: res.status, responseType: constants_1.HttpResponseTypes.SUCCESS, data: res.data },
            ];
          case 2:
            error_5 = _c.sent();
            return [
              2 /*return*/,
              {
                statusCode:
                  (_b = (_a = error_5.response) === null || _a === void 0 ? void 0 : _a.status) !== null &&
                  _b !== void 0
                    ? _b
                    : constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
                responseType: constants_1.HttpResponseTypes.FAILED,
                data: error_5.message,
              },
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return SharedHTTPModule;
})();
exports.SharedHTTPModule = SharedHTTPModule;
