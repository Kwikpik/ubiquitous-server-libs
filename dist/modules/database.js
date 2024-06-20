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
exports.initializeConnectedDS =
  exports.initializeConnectedMonitoringDSWithDefaultOptions =
  exports.initializeConnectedMainDSWithDefaultOptions =
  exports.initializeDS =
  exports.initializeMonitoringDSWithDefaultOptions =
  exports.initializeMainDSWithDefaultOptions =
    void 0;
var typeorm_1 = require("typeorm");
var constants_1 = require("../constants");
var path_1 = require("path");
var LocalDataSource = /** @class */ (function () {
  function LocalDataSource(opts) {
    if (opts === void 0) {
      opts = {
        whichDBServer: "main",
        port: 5432,
        username: "postgres",
        password: "postgres",
        databaseName: "kwikpik_db",
        shouldUseLocalhost: true,
      };
    }
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Set default values;
    opts.username = (_a = opts.username) !== null && _a !== void 0 ? _a : "postgres";
    opts.port = (_b = opts.port) !== null && _b !== void 0 ? _b : 5432;
    opts.password = (_c = opts.password) !== null && _c !== void 0 ? _c : "postgres";
    opts.whichDBServer = (_d = opts.whichDBServer) !== null && _d !== void 0 ? _d : "main";
    opts.databaseName = (_e = opts.databaseName) !== null && _e !== void 0 ? _e : "kwikpik_db";
    opts.migrations =
      (_f = opts.migrations) !== null && _f !== void 0
        ? _f
        : [].concat((0, path_1.join)(__dirname, "/migrations/*.{ts,js}"));
    opts.entities =
      (_g = opts.entities) !== null && _g !== void 0
        ? _g
        : []
            .concat((0, path_1.join)(__dirname, "/entities/*.{ts,js}"))
            .concat((0, path_1.join)(__dirname, "/models/*.{ts,js}"));
    opts.subscribers =
      (_h = opts.subscribers) !== null && _h !== void 0
        ? _h
        : [].concat((0, path_1.join)(__dirname, "/subscribers/*.{ts,js}"));
    opts.log = (_j = opts.log) !== null && _j !== void 0 ? _j : false;
    opts.shouldUseLocalhost = (_k = opts.shouldUseLocalhost) !== null && _k !== void 0 ? _k : true;
    var url = "postgres://"
      .concat(opts.username, ":")
      .concat(opts.password, "@")
      .concat(
        opts.shouldUseLocalhost
          ? "localhost"
          : opts.whichDBServer === "main"
          ? constants_1.ServiceNames.MAIN_DB
          : constants_1.ServiceNames.MONITORING_DB,
        ":"
      )
      .concat(opts.port, "/")
      .concat(opts.databaseName);
    var opt = {
      url: url,
      type: "postgres",
      migrations: opts.migrations,
      entities: opts.entities,
      subscribers: opts.subscribers,
      logging: opts.log,
    };
    // Set datasource
    this.DS = new typeorm_1.DataSource(opt);
  }
  LocalDataSource.constructDefaultMainDS = function () {
    return new LocalDataSource();
  };
  LocalDataSource.constructDefaultMonitoringDS = function () {
    return new LocalDataSource({ whichDBServer: "monitoring" });
  };
  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  LocalDataSource.prototype.connect = function (silenceInfoLogs) {
    this.DS.initialize()
      .then(function (ds) {
        if (!silenceInfoLogs) {
          console.info("connected to datasource with options: \n");
          console.table(ds.options);
        }
      })
      .catch(function (error) {
        throw error;
      });
  };
  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  LocalDataSource.prototype.disconnect = function (silenceInfoLogs) {
    this.DS.destroy()
      .then(function () {
        if (!silenceInfoLogs) console.info("disconnected from datasource");
      })
      .catch(function (error) {
        throw error;
      });
  };
  LocalDataSource.prototype.isConnected = function () {
    return this.DS.isInitialized;
  };
  LocalDataSource.prototype.insertEntity = function (target, values) {
    return __awaiter(this, void 0, void 0, function () {
      var value, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.DS.getRepository(target).save(values)];
          case 1:
            value = _a.sent();
            return [2 /*return*/, value];
          case 2:
            error_1 = _a.sent();
            throw error_1;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSource.prototype.querySingleEntity = function (target, where, relations) {
    return __awaiter(this, void 0, void 0, function () {
      var value, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.DS.getRepository(target).findOne({ where: where, relations: relations })];
          case 1:
            value = _a.sent();
            return [2 /*return*/, value];
          case 2:
            error_2 = _a.sent();
            throw error_2;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSource.prototype.queryManyEntities = function (target_1, where_1, order_1, relations_1) {
    return __awaiter(this, arguments, void 0, function (target, where, order, relations, skip, take) {
      var value, error_3;
      if (skip === void 0) {
        skip = 0;
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              this.DS.getRepository(target).find({
                where: where,
                order: order,
                relations: relations,
                skip: skip,
                take: take,
              }),
            ];
          case 1:
            value = _a.sent();
            return [2 /*return*/, value];
          case 2:
            error_3 = _a.sent();
            throw error_3;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSource.prototype.updateEntity = function (target, values) {
    return __awaiter(this, void 0, void 0, function () {
      var value, error_4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.DS.getRepository(target).save(values)];
          case 1:
            value = _a.sent();
            return [2 /*return*/, value];
          case 2:
            error_4 = _a.sent();
            throw error_4;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSource.prototype.deleteEntity = function (target, where) {
    return __awaiter(this, void 0, void 0, function () {
      var result, error_5;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.DS.getRepository(target).delete(where)];
          case 1:
            result = _a.sent();
            return [2 /*return*/, result];
          case 2:
            error_5 = _a.sent();
            throw error_5;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSource.prototype.entityExists = function (target, where) {
    return __awaiter(this, void 0, void 0, function () {
      var value, error_6;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.DS.getRepository(target).existsBy(where)];
          case 1:
            value = _a.sent();
            return [2 /*return*/, value];
          case 2:
            error_6 = _a.sent();
            throw error_6;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  LocalDataSource.prototype.countEntities = function (target, where) {
    return __awaiter(this, void 0, void 0, function () {
      var value, error_7;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, this.DS.getRepository(target).count({ where: where })];
          case 1:
            value = _a.sent();
            return [2 /*return*/, value];
          case 2:
            error_7 = _a.sent();
            throw error_7;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return LocalDataSource;
})();
/**
 * Construct main datasource object with default options.
 *
 */
var initializeMainDSWithDefaultOptions = function () {
  return LocalDataSource.constructDefaultMainDS();
};
exports.initializeMainDSWithDefaultOptions = initializeMainDSWithDefaultOptions;
/**
 * Construct monitoring datasource object with default options.
 */
var initializeMonitoringDSWithDefaultOptions = function () {
  return LocalDataSource.constructDefaultMonitoringDS();
};
exports.initializeMonitoringDSWithDefaultOptions = initializeMonitoringDSWithDefaultOptions;
/**
 *  Construct datasource object.
 * @param opts Initialization options. {@link LocalDataSourceOpts | See implementation}
 */
var initializeDS = function (opts) {
  return new LocalDataSource(opts);
};
exports.initializeDS = initializeDS;
/**
 * Construct main datasource object with default options, and connect immediately.
 * @param silenceInfoLogs Don't log connection info.
 * @returns
 */
var initializeConnectedMainDSWithDefaultOptions = function (silenceInfoLogs) {
  try {
    var DS = LocalDataSource.constructDefaultMainDS();
    // Connect
    DS.connect(silenceInfoLogs);
    return DS;
  } catch (error) {
    console.error("an error occured while connecting. error message - %s", error.message);
    return null;
  }
};
exports.initializeConnectedMainDSWithDefaultOptions = initializeConnectedMainDSWithDefaultOptions;
/**
 * Construct monitoring datasource object with default options, and connect immediately.
 * @param silenceInfoLogs Don't log connection info.
 */
var initializeConnectedMonitoringDSWithDefaultOptions = function (silenceInfoLogs) {
  try {
    var DS = LocalDataSource.constructDefaultMonitoringDS();
    // Connect
    DS.connect(silenceInfoLogs);
    return DS;
  } catch (error) {
    console.error("an error occured while connecting. error message - %s", error.message);
    return null;
  }
};
exports.initializeConnectedMonitoringDSWithDefaultOptions = initializeConnectedMonitoringDSWithDefaultOptions;
/**
 * Construct datasource object, and connect immediately.
 * @param opts Initialization options. {@link LocalDataSourceOpts | See implementation}.
 * @param silenceInfoLogs Don't log connection info.
 * @returns
 */
var initializeConnectedDS = function (opts, silenceInfoLogs) {
  try {
    var DS = new LocalDataSource(opts);
    // Connect
    DS.connect(silenceInfoLogs);
    return DS;
  } catch (error) {
    console.error("an error occured while connecting. error message - %s", error.message);
    return null;
  }
};
exports.initializeConnectedDS = initializeConnectedDS;
