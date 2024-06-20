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
exports.initializeMonitoringDataSourceAccessorDefault =
  exports.initializeMainDataSourceAccessorDefault =
  exports.initializeDataSourceAccessor =
    void 0;
require("reflect-metadata");
var database_1 = require("./database");
var assert_1 = __importDefault(require("assert"));
var isNil_1 = __importDefault(require("lodash/isNil"));
var LocalDataSourceAccessor = /** @class */ (function () {
  function LocalDataSourceAccessor(DS, trgt) {
    this.target = trgt;
    this.DS = DS;
  }
  LocalDataSourceAccessor.constructMainDefault = function (trgt) {
    var defaultDS = (0, database_1.initializeMainDSWithDefaultOptions)();
    return new LocalDataSourceAccessor(defaultDS, trgt);
  };
  LocalDataSourceAccessor.constructMonitoringDefault = function (trgt) {
    var defaultMonitoringDS = (0, database_1.initializeMonitoringDSWithDefaultOptions)();
    return new LocalDataSourceAccessor(defaultMonitoringDS, trgt);
  };
  LocalDataSourceAccessor.prototype.checkTargetAndDataSource = function () {
    assert_1.default.ok(!(0, isNil_1.default)(this.target), "target_is_uninitialized");
    assert_1.default.ok(!(0, isNil_1.default)(this.DS), "datasource_is_uninitialized");
    assert_1.default.ok(this.DS.isConnected(), "datasource_not_connected_to_server");
  };
  LocalDataSourceAccessor.prototype.insertEntity = function (value) {
    return __awaiter(this, void 0, void 0, function () {
      var data, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.checkTargetAndDataSource();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, this.DS.insertEntity(this.target, value)];
          case 2:
            data = _a.sent();
            return [2 /*return*/, { responseType: "success", data: data, error: undefined }];
          case 3:
            error_1 = _a.sent();
            return [2 /*return*/, { responseType: "failure", data: undefined, error: error_1.messge }];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSourceAccessor.prototype.readEntity = function (where, relations) {
    return __awaiter(this, void 0, void 0, function () {
      var data, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.checkTargetAndDataSource();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, this.DS.querySingleEntity(this.target, where, relations)];
          case 2:
            data = _a.sent();
            return [2 /*return*/, { responseType: "success", data: data, error: undefined }];
          case 3:
            error_2 = _a.sent();
            return [2 /*return*/, { responseType: "failure", data: undefined, error: error_2.messge }];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSourceAccessor.prototype.readManyEntities = function (where_1, order_1, relations_1) {
    return __awaiter(this, arguments, void 0, function (where, order, relations, skip, take) {
      var data, error_3;
      if (skip === void 0) {
        skip = 0;
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.checkTargetAndDataSource();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, this.DS.queryManyEntities(this.target, where, order, relations, skip, take)];
          case 2:
            data = _a.sent();
            return [2 /*return*/, { responseType: "success", data: data, error: undefined }];
          case 3:
            error_3 = _a.sent();
            return [2 /*return*/, { responseType: "failure", data: undefined, error: error_3.messge }];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSourceAccessor.prototype.updateEntity = function (values) {
    return __awaiter(this, void 0, void 0, function () {
      var data, error_4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.checkTargetAndDataSource();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, this.DS.updateEntity(this.target, values)];
          case 2:
            data = _a.sent();
            return [2 /*return*/, { responseType: "success", data: data, error: undefined }];
          case 3:
            error_4 = _a.sent();
            return [2 /*return*/, { responseType: "failure", data: undefined, error: error_4.messge }];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSourceAccessor.prototype.deleteEntity = function (where) {
    return __awaiter(this, void 0, void 0, function () {
      var data, error_5;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.checkTargetAndDataSource();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, this.DS.deleteEntity(this.target, where)];
          case 2:
            data = _a.sent();
            return [2 /*return*/, { responseType: "success", data: data, error: undefined }];
          case 3:
            error_5 = _a.sent();
            return [2 /*return*/, { responseType: "failure", data: undefined, error: error_5.messge }];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSourceAccessor.prototype.entityExists = function (where) {
    return __awaiter(this, void 0, void 0, function () {
      var data, error_6;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.checkTargetAndDataSource();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, this.DS.entityExists(this.target, where)];
          case 2:
            data = _a.sent();
            return [2 /*return*/, { responseType: "success", data: data, error: undefined }];
          case 3:
            error_6 = _a.sent();
            return [2 /*return*/, { responseType: "failure", data: undefined, error: error_6.messge }];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSourceAccessor.prototype.countEntities = function (where) {
    return __awaiter(this, void 0, void 0, function () {
      var data, error_7;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.checkTargetAndDataSource();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, this.DS.countEntities(this.target, where)];
          case 2:
            data = _a.sent();
            return [2 /*return*/, { responseType: "success", data: data, error: undefined }];
          case 3:
            error_7 = _a.sent();
            return [2 /*return*/, { responseType: "failure", data: undefined, error: error_7.messge }];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return LocalDataSourceAccessor;
})();
/**
 * Initialize datasource accessor
 * @param DS The datasource.
 * @param target Target entity.
 * @returns
 */
var initializeDataSourceAccessor = function (DS, target) {
  return new LocalDataSourceAccessor(DS, target);
};
exports.initializeDataSourceAccessor = initializeDataSourceAccessor;
/**
 * Initialize main datasource accessor using datasource with default options.
 * @param target Target entity.
 * @returns
 */
var initializeMainDataSourceAccessorDefault = function (target) {
  return LocalDataSourceAccessor.constructMainDefault(target);
};
exports.initializeMainDataSourceAccessorDefault = initializeMainDataSourceAccessorDefault;
/**
 * Initialize monitoring datasource accessor using datasource with default options.
 * @param target Target entity.
 * @returns
 */
var initializeMonitoringDataSourceAccessorDefault = function (target) {
  return LocalDataSourceAccessor.constructMonitoringDefault(target);
};
exports.initializeMonitoringDataSourceAccessorDefault = initializeMonitoringDataSourceAccessorDefault;
