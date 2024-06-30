import { Consumer, Kafka, Producer } from "kafkajs";
import isNil from "lodash/isNil";

interface LocalKafkaInstanceOpts {
  /**
   * Client ID
   */
  clientId?: string;

  /**
   * Port to connect to
   */
  port?: number;

  /**
   * How long in seconds to wait for a successful connection. Defaults to 1s
   */
  connectTimeout?: number;

  /**
   * Whether to connect using localhost
   */
  shouldUseLocalhost?: boolean;

  /**
   * Service name to use in case localhost connection is disabled
   */
  serviceName?: string;
}

interface LocalKafkaProducerOpts {
  /**
   * Whether to automatically create topics.
   */
  shouldAutoCreateTopics?: boolean;
}

interface LocalKafkaConsumerOpts {
  /**
   * Whether to automatically create topics
   */
  shouldAutoCreateTopics?: boolean;
  /**
   * Group ID
   */
  groupId: string;
  /**
   * Session timeout in seconds. Defaults to 60s
   */
  sessionTimeout?: number;
}

class LocalKafkaInstance {
  private K: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;

  constructor(
    opts: LocalKafkaInstanceOpts = {
      clientId: "kwikpik",
      port: 9092,
      connectTimeout: 1,
      serviceName: "kafka",
      shouldUseLocalhost: true,
    }
  ) {
    // Set default values
    opts.clientId = opts.clientId ?? "kwikpik";
    opts.port = opts.port ?? 9092;
    opts.connectTimeout = opts.connectTimeout ?? 1;
    opts.shouldUseLocalhost = opts.shouldUseLocalhost ?? true;
    opts.serviceName = opts.serviceName ?? "kafka";

    const brokers = ([] as string[]).concat(`${opts.shouldUseLocalhost ? "localhost" : opts.serviceName}:${opts.port}`);

    this.K = new Kafka({ clientId: opts.clientId, brokers, connectionTimeout: opts.connectTimeout * 1000 });
  }

  /**
   *
   * @param opts Producer configuration. {@link LocalKafkaProducerOpts | See implementation}.
   */
  public configureProducer(opts: LocalKafkaProducerOpts = { shouldAutoCreateTopics: false }) {
    // Set default values;
    opts.shouldAutoCreateTopics = opts.shouldAutoCreateTopics ?? false;

    this.producer = this.K.producer({ allowAutoTopicCreation: opts.shouldAutoCreateTopics });
  }

  /**
   *
   * @param opts Consumer configuration. {@link LocalKafkaConsumerOpts | See implementation}.
   */
  public configureConsumer(opts: LocalKafkaConsumerOpts) {
    // Set default values
    opts.shouldAutoCreateTopics = opts.shouldAutoCreateTopics ?? false;
    opts.sessionTimeout = opts.sessionTimeout ?? 60;

    this.consumer = this.K.consumer({
      groupId: opts.groupId,
      sessionTimeout: opts.sessionTimeout * 1000,
      allowAutoTopicCreation: opts.shouldAutoCreateTopics,
    });
  }

  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  public connectProducer(silenceInfoLogs?: boolean) {
    if (!isNil(this.producer))
      this.producer
        .connect()
        .then(() => {
          if (!silenceInfoLogs) console.info("kafka producer connected");
        })
        .catch(error => {
          throw error;
        });
  }

  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  public disconnectProducer(silenceInfoLogs?: boolean) {
    if (!isNil(this.producer))
      this.producer
        .disconnect()
        .then(() => {
          if (!silenceInfoLogs) console.info("kafka producer disconnected");
        })
        .catch(error => {
          throw error;
        });
  }

  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  public connectConsumer(silenceInfoLogs?: boolean) {
    if (!isNil(this.consumer))
      this.consumer
        .connect()
        .then(() => {
          if (!silenceInfoLogs) console.info("kafka consumer connected");
        })
        .catch(error => {
          throw error;
        });
  }

  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  public disconnectConsumer(silenceInfoLogs?: boolean) {
    if (!isNil(this.consumer))
      this.consumer
        .connect()
        .then(() => {
          if (!silenceInfoLogs) console.info("kafka consumer disconnected");
        })
        .catch(error => {
          throw error;
        });
  }

  /**
   *
   * @param topic Topic to send message to.
   * @param message Message to send.
   * @param logSendResult Whether to log result.
   */
  public produce(topic: string, message: Record<string, any> | Record<string, any>[], logSendResult: boolean = false) {
    if (!isNil(this.producer))
      this.producer
        .send({
          topic,
          messages: Array.isArray(message)
            ? message.map(msg => ({ value: JSON.stringify(msg) }))
            : [{ value: JSON.stringify(message) }],
        })
        .then(recordMetadata => {
          if (logSendResult) {
            console.info("new message produced for topic: %s \n", topic);
            console.table(recordMetadata);
          }
        })
        .catch((error: any) => {
          console.info("an error occured while producing message \n");
          console.error(error);
        });
  }

  public subscribe(opts: {
    topic: string;
    numberOfConcurrentPartitions?: number;
    listener?: (value: Record<string, any>, topic?: string) => void | Promise<void>;
  }) {
    opts.numberOfConcurrentPartitions = opts.numberOfConcurrentPartitions ?? 7;

    if (!isNil(this.consumer))
      this.consumer
        .subscribe({ topic: opts.topic })
        .then(() =>
          this.consumer!.run({
            partitionsConsumedConcurrently: opts.numberOfConcurrentPartitions,
            eachMessage: async ({ message, topic }) => {
              if (!isNil(opts.listener))
                if (!isNil(message.value)) {
                  const parsedMessage = JSON.parse(message.value.toString());
                  opts.listener(parsedMessage, topic);
                }
            },
          })
        )
        .catch(error => {
          console.info("an error occured while subscribing to %s \n", opts.topic);
          console.error(error);
        });
  }

  static constructDefault() {
    return new LocalKafkaInstance();
  }
}

/**
 * Construct Kafka instance using default options
 * @returns
 */
export const initializeKafkaWithDefaultOptions = () => LocalKafkaInstance.constructDefault();

/**
 *
 * @param opts Instance configuration. {@link LocalKafkaInstanceOpts | See implementation}.
 * @returns
 */
export const initializeKafka = (opts?: LocalKafkaInstanceOpts) => new LocalKafkaInstance(opts);

/**
 *
 * @param kInstance LocalKafkaInstance to derive consumer from.
 * @param opts Consumer configuration. {@link LocalKafkaConsumerOpts | See implementation}.
 * @param silenceInfoLogs Don't log connection info.
 */
export const configureConnectedConsumer = (
  kInstance: LocalKafkaInstance,
  opts: LocalKafkaConsumerOpts,
  silenceInfoLogs?: boolean
) => {
  kInstance.configureConsumer(opts);
  kInstance.connectConsumer(silenceInfoLogs);
};

/**
 *
 * @param kInstance LocalKafkaInstance to derive producer from.
 * @param opts Consumer configuration. {@link LocalKafkaProducerOpts | See implementation}.
 * @param silenceInfoLogs Don't log connection info.
 */
export const configureConnectedProducer = (
  kInstance: LocalKafkaInstance,
  opts?: LocalKafkaProducerOpts,
  silenceInfoLogs?: boolean
) => {
  kInstance.configureProducer(opts);
  kInstance.connectProducer(silenceInfoLogs);
};

export type LocalKafkaInstanceType = LocalKafkaInstance;
