"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
exports.initializeIPFSInstance = exports.initializeDefaultIPFSInstance = void 0;
var is_base64_1 = __importDefault(require("is-base64"));
var formdata_node_1 = require("formdata-node");
var constants_1 = require("../constants");
var http_1 = require("../shared/http");
var assert_1 = __importDefault(require("assert"));
var crypto_1 = require("crypto");
var isNil_1 = __importDefault(require("lodash/isNil"));
var LocalIPFSInstance = /** @class */ (function () {
  function LocalIPFSInstance(opts) {
    if (opts === void 0) {
      opts = { port: 5001, shouldUseLocalhost: true };
    }
    var _a, _b;
    // Set default value;
    opts.port = (_a = opts.port) !== null && _a !== void 0 ? _a : 5001;
    opts.shouldUseLocalhost = (_b = opts.shouldUseLocalhost) !== null && _b !== void 0 ? _b : true;
    var baseURL = "http://"
      .concat(opts.shouldUseLocalhost ? "localhost" : constants_1.ServiceNames.IPFS, ":")
      .concat(opts.port);
    this.$httpInstance = http_1.SharedHTTPModule.constructWithBaseURL(baseURL);
  }
  LocalIPFSInstance.constructDefault = function () {
    return new LocalIPFSInstance();
  };
  LocalIPFSInstance.prototype.pinWithBase64 = function (base64_1, name_1) {
    return __awaiter(this, arguments, void 0, function (base64, name, quiet, progress) {
      var isValidBase64, buffer, data, fileName, file, params, ipfsResponse, response, hash;
      if (quiet === void 0) {
        quiet = false;
      }
      if (progress === void 0) {
        progress = true;
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            isValidBase64 = (0, is_base64_1.default)(base64);
            assert_1.default.ok(isValidBase64, "invalid_base64");
            buffer = Buffer.from(base64, "base64");
            data = new formdata_node_1.FormData();
            fileName =
              name !== null && name !== void 0 ? name : "".concat((0, crypto_1.randomUUID)(), "-").concat(Date.now());
            file = new formdata_node_1.File([buffer], fileName);
            // Append file
            data.append("file", file);
            params = {};
            // Append params
            params.pin = true;
            params.quiet = quiet;
            params.progress = progress;
            return [4 /*yield*/, this.$httpInstance.post("/api/v0/add", data, undefined, params)];
          case 1:
            ipfsResponse = _a.sent();
            if (ipfsResponse.responseType === constants_1.HttpResponseTypes.FAILED) {
              return [2 /*return*/, Promise.reject(new Error(ipfsResponse.data))];
            }
            response = ipfsResponse.data.split("/");
            hash = response
              .filter(function (str_1) {
                return str_1.trim().length > 0;
              })
              .map(function (str_2) {
                return JSON.parse(str_2);
              })
              .filter(function (obj) {
                return !(0, isNil_1.default)(obj["Hash"]);
              })
              .map(function (obj_1) {
                return obj_1["Hash"];
              });
            return [2 /*return*/, __assign(__assign({}, ipfsResponse), { data: hash[0] })];
        }
      });
    });
  };
  return LocalIPFSInstance;
})();
/**
 * Initializes default IPFS instance
 * @returns
 */
var initializeDefaultIPFSInstance = function () {
  return LocalIPFSInstance.constructDefault();
};
exports.initializeDefaultIPFSInstance = initializeDefaultIPFSInstance;
/**
 *
 * @param opts IPFS configuration. {@link IPFSConfig | See implementation}.
 */
var initializeIPFSInstance = function (opts) {
  return new LocalIPFSInstance(opts);
};
exports.initializeIPFSInstance = initializeIPFSInstance;
