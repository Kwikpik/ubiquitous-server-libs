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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeHTTPModule = void 0;
var constants_1 = require("../../../constants");
var http_1 = require("../../../shared/http");
var Endpoints;
(function (Endpoints) {
  Endpoints["AUTHENTICATE"] = "/authenticate";
  Endpoints["GET_BY_ID"] = "/byId/:id";
})(Endpoints || (Endpoints = {}));
var HTTPModule = /** @class */ (function () {
  function HTTPModule(opts) {
    if (opts === void 0) {
      opts = { shouldUseLocalhost: false, port: 1700 };
    }
    var _a, _b;
    // Set default values
    opts.shouldUseLocalhost = (_a = opts.shouldUseLocalhost) !== null && _a !== void 0 ? _a : false;
    opts.port = (_b = opts.port) !== null && _b !== void 0 ? _b : 1700;
    var rootUrl = "http://"
      .concat(opts.shouldUseLocalhost ? "127.0.0.1" : constants_1.ServiceNames.AUTHENTICATION, ":")
      .concat(opts.port);
    this.$ = http_1.SharedHTTPModule.constructWithBaseURL(rootUrl);
  }
  /**
   *
   * @param subEndpoint Allowed sub-endpoint. {@link AllowedSubEndpoints | See possible values}.
   * @param jwt JSON web token for authentication.
   * @returns
   */
  HTTPModule.prototype.authenticate = function (subEndpoint, jwt) {
    return __awaiter(this, void 0, void 0, function () {
      var headers, fullPath, res;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            headers = {};
            headers.authorization = "Bearer ".concat(jwt);
            fullPath = subEndpoint + "/" + Endpoints.AUTHENTICATE;
            return [4 /*yield*/, this.$.get(fullPath, headers)];
          case 1:
            res = _a.sent();
            return [2 /*return*/, res];
        }
      });
    });
  };
  HTTPModule.prototype.retrieveById = function (subEndpoint, id) {
    return __awaiter(this, void 0, void 0, function () {
      var fullPath, res;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            fullPath = subEndpoint + "/" + Endpoints.GET_BY_ID.replace(":id", id);
            return [4 /*yield*/, this.$.get(fullPath)];
          case 1:
            res = _a.sent();
            return [2 /*return*/, res];
        }
      });
    });
  };
  return HTTPModule;
})();
/**
 *
 * @param opts HTTP module configuration. {@link AuthHTTPModuleConfig | See implementation}.
 * @returns
 */
var initializeHTTPModule = function (opts) {
  return new HTTPModule(opts);
};
exports.initializeHTTPModule = initializeHTTPModule;
