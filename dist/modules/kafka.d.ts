import { AllowedKafkaTopics } from "../constants";
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
declare class LocalKafkaInstance {
  private K;
  private producer;
  private consumer;
  constructor(opts?: LocalKafkaInstanceOpts);
  /**
   *
   * @param opts Producer configuration. {@link LocalKafkaProducerOpts | See implementation}.
   */
  configureProducer(opts?: LocalKafkaProducerOpts): void;
  /**
   *
   * @param opts Consumer configuration. {@link LocalKafkaConsumerOpts | See implementation}.
   */
  configureConsumer(opts: LocalKafkaConsumerOpts): void;
  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  connectProducer(silenceInfoLogs?: boolean): void;
  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  connectConsumer(silenceInfoLogs?: boolean): void;
  /**
   *
   * @param topic Topic to send message to.
   * @param message Message to send.
   * @param logSendResult Whether to log result.
   */
  produce(
    topic: AllowedKafkaTopics,
    message: Record<string, any> | Record<string, any>[],
    logSendResult?: boolean
  ): void;
  subscribe(opts: {
    topic: AllowedKafkaTopics;
    numberOfConcurrentPartitions?: number;
    listener?: (value: Record<string, any>, topic?: string) => void | Promise<void>;
  }): void;
  static constructDefault(): LocalKafkaInstance;
}
/**
 * Construct Kafka instance using default options
 * @returns
 */
export declare const initializeKafkaWithDefaultOptions: () => LocalKafkaInstance;
/**
 *
 * @param opts Instance configuration. {@link LocalKafkaInstanceOpts | See implementation}.
 * @returns
 */
export declare const initializeKafka: (opts?: LocalKafkaInstanceOpts) => LocalKafkaInstance;
/**
 *
 * @param kInstance LocalKafkaInstance to derive consumer from.
 * @param opts Consumer configuration. {@link LocalKafkaConsumerOpts | See implementation}.
 * @param silenceInfoLogs Don't log connection info.
 */
export declare const configureConnectedConsumer: (
  kInstance: LocalKafkaInstance,
  opts: LocalKafkaConsumerOpts,
  silenceInfoLogs?: boolean
) => void;
/**
 *
 * @param kInstance LocalKafkaInstance to derive producer from.
 * @param opts Consumer configuration. {@link LocalKafkaProducerOpts | See implementation}.
 * @param silenceInfoLogs Don't log connection info.
 */
export declare const configureConnectedProducer: (
  kInstance: LocalKafkaInstance,
  opts?: LocalKafkaProducerOpts,
  silenceInfoLogs?: boolean
) => void;
export type LocalKafkaInstanceType = LocalKafkaInstance;
export {};
//# sourceMappingURL=kafka.d.ts.map
