import "reflect-metadata";
import {
  type FindOptionsWhere,
  type EntityTarget,
  type ObjectLiteral,
  type FindOptionsRelations,
  type FindOptionsOrder,
  type DeleteResult,
} from "typeorm";
import { LocalDataSourceType } from "./database";
import { ExcludeFuctionsMapper, OptionalKeysMapper } from "../utils/mappers";
interface OperationResponse<T> {
  responseType: "success" | "failure";
  data?: T;
  error?: any;
}
declare class LocalDataSourceAccessor<T extends EntityTarget<ObjectLiteral>> {
  target?: T;
  DS?: LocalDataSourceType;
  constructor(DS: LocalDataSourceType, trgt: T);
  static constructMainDefault<S extends EntityTarget<ObjectLiteral>>(trgt: S): LocalDataSourceAccessor<S>;
  static constructMonitoringDefault<S extends EntityTarget<ObjectLiteral>>(trgt: S): LocalDataSourceAccessor<S>;
  private checkTargetAndDataSource;
  insertEntity(value: ExcludeFuctionsMapper<T>): Promise<OperationResponse<ExcludeFuctionsMapper<T> & ObjectLiteral>>;
  readEntity(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations?: FindOptionsRelations<T>
  ): Promise<OperationResponse<ObjectLiteral | null>>;
  readManyEntities(
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    order?: FindOptionsOrder<T>,
    relations?: FindOptionsRelations<T>,
    skip?: number,
    take?: number
  ): Promise<OperationResponse<ObjectLiteral[]>>;
  updateEntity(values: OptionalKeysMapper<T>): Promise<OperationResponse<OptionalKeysMapper<T> & ObjectLiteral>>;
  deleteEntity(where: FindOptionsWhere<T>): Promise<OperationResponse<DeleteResult>>;
  entityExists(where: FindOptionsWhere<T>): Promise<OperationResponse<boolean>>;
  countEntities(where?: FindOptionsWhere<T>): Promise<OperationResponse<number>>;
}
/**
 * Initialize datasource accessor
 * @param DS The datasource.
 * @param target Target entity.
 * @returns
 */
export declare const initializeDataSourceAccessor: <T extends EntityTarget<ObjectLiteral>>(
  DS: LocalDataSourceType,
  target: T
) => LocalDataSourceAccessor<T>;
/**
 * Initialize main datasource accessor using datasource with default options.
 * @param target Target entity.
 * @returns
 */
export declare const initializeMainDataSourceAccessorDefault: <T extends EntityTarget<ObjectLiteral>>(
  target: T
) => LocalDataSourceAccessor<T>;
/**
 * Initialize monitoring datasource accessor using datasource with default options.
 * @param target Target entity.
 * @returns
 */
export declare const initializeMonitoringDataSourceAccessorDefault: <T extends EntityTarget<ObjectLiteral>>(
  target: T
) => LocalDataSourceAccessor<T>;
export {};
//# sourceMappingURL=datasource-accessors.d.ts.map
