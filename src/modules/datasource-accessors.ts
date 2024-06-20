import "reflect-metadata";
import {
  type FindOptionsWhere,
  type EntityTarget,
  type ObjectLiteral,
  type FindOptionsRelations,
  type FindOptionsOrder,
  type DeleteResult,
} from "typeorm";
import {
  LocalDataSourceType,
  initializeMainDSWithDefaultOptions,
  initializeMonitoringDSWithDefaultOptions,
} from "./database";
import assert from "assert";
import isNil from "lodash/isNil";
import { ExcludeFuctionsMapper, OptionalKeysMapper } from "../utils/mappers";

interface OperationResponse<T> {
  responseType: "success" | "failure";
  data?: T;
  error?: any;
}

class LocalDataSourceAccessor<T extends EntityTarget<ObjectLiteral>> {
  target?: T;
  DS?: LocalDataSourceType;

  constructor(DS: LocalDataSourceType, trgt: T) {
    this.target = trgt;
    this.DS = DS;
  }

  static constructMainDefault<S extends EntityTarget<ObjectLiteral>>(trgt: S) {
    const defaultDS = initializeMainDSWithDefaultOptions();
    return new LocalDataSourceAccessor<S>(defaultDS, trgt);
  }

  static constructMonitoringDefault<S extends EntityTarget<ObjectLiteral>>(trgt: S) {
    const defaultMonitoringDS = initializeMonitoringDSWithDefaultOptions();
    return new LocalDataSourceAccessor<S>(defaultMonitoringDS, trgt);
  }

  private checkTargetAndDataSource() {
    assert.ok(!isNil(this.target), "target_is_uninitialized");
    assert.ok(!isNil(this.DS), "datasource_is_uninitialized");
    assert.ok(this.DS.isConnected(), "datasource_not_connected_to_server");
  }

  async insertEntity(
    value: ExcludeFuctionsMapper<T>
  ): Promise<OperationResponse<ExcludeFuctionsMapper<T> & ObjectLiteral>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.insertEntity(this.target!, value);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.messge };
    }
  }

  async readEntity(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations?: FindOptionsRelations<T>
  ): Promise<OperationResponse<ObjectLiteral | null>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.querySingleEntity(this.target!, where, relations);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.messge };
    }
  }

  async readManyEntities(
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    order?: FindOptionsOrder<T>,
    relations?: FindOptionsRelations<T>,
    skip: number = 0,
    take?: number
  ): Promise<OperationResponse<ObjectLiteral[]>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.queryManyEntities(this.target!, where, order, relations, skip, take);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.messge };
    }
  }

  async updateEntity(values: OptionalKeysMapper<T>): Promise<OperationResponse<OptionalKeysMapper<T> & ObjectLiteral>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.updateEntity(this.target!, values);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.messge };
    }
  }

  async deleteEntity(where: FindOptionsWhere<T>): Promise<OperationResponse<DeleteResult>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.deleteEntity(this.target!, where);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.messge };
    }
  }

  async entityExists(where: FindOptionsWhere<T>): Promise<OperationResponse<boolean>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.entityExists(this.target!, where);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.messge };
    }
  }

  async countEntities(where?: FindOptionsWhere<T>): Promise<OperationResponse<number>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.countEntities(this.target!, where);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.messge };
    }
  }
}

/**
 * Initialize datasource accessor
 * @param DS The datasource.
 * @param target Target entity.
 * @returns
 */
export const initializeDataSourceAccessor = <T extends EntityTarget<ObjectLiteral>>(
  DS: LocalDataSourceType,
  target: T
) => new LocalDataSourceAccessor<T>(DS, target);

/**
 * Initialize main datasource accessor using datasource with default options.
 * @param target Target entity.
 * @returns
 */
export const initializeMainDataSourceAccessorDefault = <T extends EntityTarget<ObjectLiteral>>(target: T) =>
  LocalDataSourceAccessor.constructMainDefault(target);

/**
 * Initialize monitoring datasource accessor using datasource with default options.
 * @param target Target entity.
 * @returns
 */
export const initializeMonitoringDataSourceAccessorDefault = <T extends EntityTarget<ObjectLiteral>>(target: T) =>
  LocalDataSourceAccessor.constructMonitoringDefault(target);
