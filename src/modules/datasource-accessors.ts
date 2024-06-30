import {
  type FindOptionsWhere,
  type ObjectLiteral,
  type FindOptionsRelations,
  type FindOptionsOrder,
  type DeleteResult,
  EntityTarget,
} from "typeorm";
import { LocalDataSourceType, initializeDSWithDefaultOptions } from "./database";
import assert from "assert";
import isNil from "lodash/isNil";
import { ExcludeFuctionsMapper, OptionalKeysMapper } from "../utils/mappers";

interface OperationResponse<T> {
  responseType: "success" | "failure";
  data?: T;
  error?: any;
}

class LocalDataSourceAccessor<T extends ObjectLiteral> {
  target?: EntityTarget<T>;
  DS?: LocalDataSourceType;

  constructor(DS: LocalDataSourceType, trgt: EntityTarget<T>) {
    this.target = trgt;
    this.DS = DS;
  }

  static constructMainDefault<S extends ObjectLiteral>(trgt: EntityTarget<S>) {
    const defaultDS = initializeDSWithDefaultOptions();
    return new LocalDataSourceAccessor<S>(defaultDS, trgt);
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
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.message };
    }
  }

  async readEntity(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations?: FindOptionsRelations<T>
  ): Promise<OperationResponse<T | null>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.querySingleEntity(this.target!, where, relations);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.message };
    }
  }

  async readManyEntities(
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    order?: FindOptionsOrder<T>,
    relations?: FindOptionsRelations<T>,
    skip: number = 0,
    take?: number
  ): Promise<OperationResponse<T[]>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.queryManyEntities(this.target!, where, order, relations, skip, take);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.message };
    }
  }

  async updateEntity(values: OptionalKeysMapper<T>): Promise<OperationResponse<OptionalKeysMapper<T> & ObjectLiteral>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.updateEntity(this.target!, values);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.message };
    }
  }

  async deleteEntity(where: FindOptionsWhere<T>): Promise<OperationResponse<DeleteResult>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.deleteEntity(this.target!, where);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.message };
    }
  }

  async entityExists(where: FindOptionsWhere<T>): Promise<OperationResponse<boolean>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.entityExists(this.target!, where);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.message };
    }
  }

  async countEntities(where?: FindOptionsWhere<T>): Promise<OperationResponse<number>> {
    this.checkTargetAndDataSource();
    try {
      const data = await this.DS!.countEntities(this.target!, where);
      return { responseType: "success" as "success" | "failure", data, error: undefined };
    } catch (error: any) {
      return { responseType: "failure" as "success" | "failure", data: undefined, error: error.message };
    }
  }
}

/**
 * Initialize datasource accessor
 * @param DS The datasource.
 * @param target Target entity.
 * @returns
 */
export const initializeDataSourceAccessor = <T extends ObjectLiteral>(
  DS: LocalDataSourceType,
  target: EntityTarget<T>
) => new LocalDataSourceAccessor<T>(DS, target);

/**
 * Initialize main datasource accessor using datasource with default options.
 * @param target Target entity.
 * @returns
 */
export const initializeDataSourceAccessorDefault = <T extends ObjectLiteral>(target: EntityTarget<T>) =>
  LocalDataSourceAccessor.constructMainDefault(target);
