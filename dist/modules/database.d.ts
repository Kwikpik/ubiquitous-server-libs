import {
  DataSource,
  type MixedList,
  type ObjectLiteral,
  type EntityTarget,
  type FindOptionsWhere,
  type FindOptionsOrder,
  type FindOptionsRelations,
  type EntitySchema,
} from "typeorm";
import { ExcludeFuctionsMapper, OptionalKeysMapper } from "../utils/mappers";
interface LocalDataSourceOpts {
  /**
   * Which database server to use for connection.
   */
  whichDBServer?: "main" | "monitoring";
  /**
   * Port number. Defaults to 5432.
   */
  port?: number;
  /**
   * Username to connect with.
   */
  username?: string;
  /**
   * Password to connect with.
   */
  password?: string;
  /**
   * Migrations to run.
   */
  migrations?: MixedList<string | Function>;
  /**
   * Whether to log SQL queries.
   */
  log?: boolean;
  /**
   * Database name.
   */
  databaseName?: string;
  /**
   * Typeorm subscribers
   */
  subscribers?: MixedList<string | Function>;
  /**
   * Typeorm entities
   */
  entities?: MixedList<string | Function | EntitySchema<any>>;
  /**
   * Whether to use localhost instead of Docker environment
   */
  shouldUseLocalhost?: boolean;
}
declare class LocalDataSource {
  DS: DataSource;
  constructor(opts?: LocalDataSourceOpts);
  static constructDefaultMainDS(): LocalDataSource;
  static constructDefaultMonitoringDS(): LocalDataSource;
  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  connect(silenceInfoLogs?: boolean): void;
  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  disconnect(silenceInfoLogs?: boolean): void;
  isConnected(): boolean;
  insertEntity<T extends EntityTarget<ObjectLiteral>>(
    target: T,
    values: ExcludeFuctionsMapper<T>
  ): Promise<ExcludeFuctionsMapper<T> & ObjectLiteral>;
  querySingleEntity<T extends EntityTarget<ObjectLiteral>>(
    target: T,
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations?: FindOptionsRelations<T>
  ): Promise<ObjectLiteral>;
  queryManyEntities<T extends EntityTarget<ObjectLiteral>>(
    target: T,
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    order?: FindOptionsOrder<T>,
    relations?: FindOptionsRelations<T>,
    skip?: number,
    take?: number
  ): Promise<ObjectLiteral[]>;
  updateEntity<T extends EntityTarget<ObjectLiteral>>(
    target: T,
    values: OptionalKeysMapper<T>
  ): Promise<OptionalKeysMapper<T> & ObjectLiteral>;
  deleteEntity<T extends EntityTarget<ObjectLiteral>>(
    target: T,
    where: FindOptionsWhere<T>
  ): Promise<import("typeorm").DeleteResult>;
  entityExists<T extends EntityTarget<ObjectLiteral>>(target: T, where: FindOptionsWhere<T>): Promise<boolean>;
  countEntities<T extends EntityTarget<ObjectLiteral>>(target: T, where?: FindOptionsWhere<T>): Promise<number>;
}
/**
 * Construct main datasource object with default options.
 *
 */
export declare const initializeMainDSWithDefaultOptions: () => LocalDataSource;
/**
 * Construct monitoring datasource object with default options.
 */
export declare const initializeMonitoringDSWithDefaultOptions: () => LocalDataSource;
/**
 *  Construct datasource object.
 * @param opts Initialization options. {@link LocalDataSourceOpts | See implementation}
 */
export declare const initializeDS: (opts?: LocalDataSourceOpts) => LocalDataSource;
/**
 * Construct main datasource object with default options, and connect immediately.
 * @param silenceInfoLogs Don't log connection info.
 * @returns
 */
export declare const initializeConnectedMainDSWithDefaultOptions: (silenceInfoLogs?: boolean) => LocalDataSource;
/**
 * Construct monitoring datasource object with default options, and connect immediately.
 * @param silenceInfoLogs Don't log connection info.
 */
export declare const initializeConnectedMonitoringDSWithDefaultOptions: (silenceInfoLogs?: boolean) => LocalDataSource;
/**
 * Construct datasource object, and connect immediately.
 * @param opts Initialization options. {@link LocalDataSourceOpts | See implementation}.
 * @param silenceInfoLogs Don't log connection info.
 * @returns
 */
export declare const initializeConnectedDS: (opts?: LocalDataSourceOpts, silenceInfoLogs?: boolean) => LocalDataSource;
export type LocalDataSourceType = LocalDataSource;
export {};
//# sourceMappingURL=database.d.ts.map
