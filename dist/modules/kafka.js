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
exports.configureConnectedProducer =
  exports.configureConnectedConsumer =
  exports.initializeKafka =
  exports.initializeKafkaWithDefaultOptions =
    void 0;
var kafkajs_1 = require("kafkajs");
var constants_1 = require("../constants");
var isNil_1 = __importDefault(require("lodash/isNil"));
var assert_1 = __importDefault(require("assert"));
var LocalKafkaInstance = /** @class */ (function () {
  function LocalKafkaInstance(opts) {
    if (opts === void 0) {
      opts = { clientId: "kwikpik", port: 9092, connectTimeout: 1 };
    }
    var _a, _b, _c;
    this.producer = null;
    this.consumer = null;
    // Set default values
    opts.clientId = (_a = opts.clientId) !== null && _a !== void 0 ? _a : "kwikpik";
    opts.port = (_b = opts.port) !== null && _b !== void 0 ? _b : 9092;
    opts.connectTimeout = (_c = opts.connectTimeout) !== null && _c !== void 0 ? _c : 1;
    var brokers = [].concat("".concat(constants_1.ServiceNames.KAFKA, ":").concat(opts.port));
    this.K = new kafkajs_1.Kafka({
      clientId: opts.clientId,
      brokers: brokers,
      connectionTimeout: opts.connectTimeout * 1000,
    });
  }
  /**
   *
   * @param opts Producer configuration. {@link LocalKafkaProducerOpts | See implementation}.
   */
  LocalKafkaInstance.prototype.configureProducer = function (opts) {
    var _a;
    if (opts === void 0) {
      opts = { shouldAutoCreateTopics: false };
    }
    // Set default values;
    opts.shouldAutoCreateTopics = (_a = opts.shouldAutoCreateTopics) !== null && _a !== void 0 ? _a : false;
    this.producer = this.K.producer({ allowAutoTopicCreation: opts.shouldAutoCreateTopics });
  };
  /**
   *
   * @param opts Consumer configuration. {@link LocalKafkaConsumerOpts | See implementation}.
   */
  LocalKafkaInstance.prototype.configureConsumer = function (opts) {
    var _a, _b;
    // Set default values
    opts.shouldAutoCreateTopics = (_a = opts.shouldAutoCreateTopics) !== null && _a !== void 0 ? _a : false;
    opts.sessionTimeout = (_b = opts.sessionTimeout) !== null && _b !== void 0 ? _b : 60;
    this.consumer = this.K.consumer({
      groupId: opts.groupId,
      sessionTimeout: opts.sessionTimeout * 1000,
      allowAutoTopicCreation: opts.shouldAutoCreateTopics,
    });
  };
  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  LocalKafkaInstance.prototype.connectProducer = function (silenceInfoLogs) {
    if (!(0, isNil_1.default)(this.producer))
      this.producer
        .connect()
        .then(function () {
          if (!silenceInfoLogs) console.info("kafka producer connected");
        })
        .catch(function (error) {
          throw error;
        });
  };
  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  LocalKafkaInstance.prototype.connectConsumer = function (silenceInfoLogs) {
    if (!(0, isNil_1.default)(this.consumer))
      this.consumer
        .connect()
        .then(function () {
          if (!silenceInfoLogs) console.info("kafka consumer connected");
        })
        .catch(function (error) {
          throw error;
        });
  };
  /**
   *
   * @param topic Topic to send message to.
   * @param message Message to send.
   * @param logSendResult Whether to log result.
   */
  LocalKafkaInstance.prototype.produce = function (topic, message, logSendResult) {
    if (logSendResult === void 0) {
      logSendResult = false;
    }
    assert_1.default.ok(Object.values(constants_1.AllowedKafkaTopics).includes(topic), "invalid_topic");
    if (!(0, isNil_1.default)(this.producer))
      this.producer
        .send({
          topic: topic,
          messages: Array.isArray(message)
            ? message.map(function (msg) {
                return { value: JSON.stringify(msg) };
              })
            : [{ value: JSON.stringify(message) }],
        })
        .then(function (recordMetadata) {
          if (logSendResult) {
            console.info("new message produced for topic: %s \n", topic);
            console.table(recordMetadata);
          }
        })
        .catch(function (error) {
          console.info("an error occured while producing message \n");
          console.error(error);
        });
  };
  LocalKafkaInstance.prototype.subscribe = function (opts) {
    var _this = this;
    var _a;
    assert_1.default.ok(Object.values(constants_1.AllowedKafkaTopics).includes(opts.topic), "invalid_topic");
    opts.numberOfConcurrentPartitions = (_a = opts.numberOfConcurrentPartitions) !== null && _a !== void 0 ? _a : 7;
    if (!(0, isNil_1.default)(this.consumer))
      this.consumer
        .subscribe({ topic: opts.topic })
        .then(function () {
          return _this.consumer.run({
            partitionsConsumedConcurrently: opts.numberOfConcurrentPartitions,
            eachMessage: function (_a) {
              return __awaiter(_this, [_a], void 0, function (_b) {
                var parsedMessage;
                var message = _b.message,
                  topic = _b.topic;
                return __generator(this, function (_c) {
                  if (!(0, isNil_1.default)(opts.listener))
                    if (!(0, isNil_1.default)(message.value)) {
                      parsedMessage = JSON.parse(message.value.toString());
                      opts.listener(parsedMessage, topic);
                    }
                  return [2 /*return*/];
                });
              });
            },
          });
        })
        .catch(function (error) {
          console.info("an error occured while subscribing to %s \n", opts.topic);
          console.error(error);
        });
  };
  LocalKafkaInstance.constructDefault = function () {
    return new LocalKafkaInstance();
  };
  return LocalKafkaInstance;
})();
/**
 * Construct Kafka instance using default options
 * @returns
 */
var initializeKafkaWithDefaultOptions = function () {
  return LocalKafkaInstance.constructDefault();
};
exports.initializeKafkaWithDefaultOptions = initializeKafkaWithDefaultOptions;
/**
 *
 * @param opts Instance configuration. {@link LocalKafkaInstanceOpts | See implementation}.
 * @returns
 */
var initializeKafka = function (opts) {
  return new LocalKafkaInstance(opts);
};
exports.initializeKafka = initializeKafka;
/**
 *
 * @param kInstance LocalKafkaInstance to derive consumer from.
 * @param opts Consumer configuration. {@link LocalKafkaConsumerOpts | See implementation}.
 * @param silenceInfoLogs Don't log connection info.
 */
var configureConnectedConsumer = function (kInstance, opts, silenceInfoLogs) {
  kInstance.configureConsumer(opts);
  kInstance.connectConsumer(silenceInfoLogs);
};
exports.configureConnectedConsumer = configureConnectedConsumer;
/**
 *
 * @param kInstance LocalKafkaInstance to derive producer from.
 * @param opts Consumer configuration. {@link LocalKafkaProducerOpts | See implementation}.
 * @param silenceInfoLogs Don't log connection info.
 */
var configureConnectedProducer = function (kInstance, opts, silenceInfoLogs) {
  kInstance.configureProducer(opts);
  kInstance.connectProducer(silenceInfoLogs);
};
exports.configureConnectedProducer = configureConnectedProducer;
