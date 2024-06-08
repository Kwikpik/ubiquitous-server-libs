import { DataSource, type MixedList, type DataSourceOptions } from "typeorm";
import { ServiceNames } from "../constants";
import { join } from "path";

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
}

class LocalDataSource {
  private DS: DataSource;

  constructor(
    opts: LocalDataSourceOpts = {
      whichDBServer: "main",
      port: 5432,
      username: "postgres",
      password: "postgres",
      databaseName: "kwikpik_db",
    }
  ) {
    // Set default values;
    opts.username = opts.username ?? "postgres";
    opts.port = opts.port ?? 5432;
    opts.password = opts.password ?? "postgres";
    opts.whichDBServer = opts.whichDBServer ?? "main";
    opts.databaseName = opts.databaseName ?? "kwikpik_db";
    opts.migrations = opts.migrations ?? ([] as string[]).concat(join(__dirname, "/migrations/*.{ts,js}"));
    opts.log = opts.log ?? false;

    const url = `postgres://${opts.username}:${opts.password}@${
      opts.whichDBServer === "main" ? ServiceNames.MAIN_DB : ServiceNames.MONITORING_DB
    }:${opts.port}/${opts.databaseName}`;
    const opt: DataSourceOptions = { url, type: "postgres", migrations: opts.migrations, logging: opts.log };

    // Set datasource
    this.DS = new DataSource(opt);
  }

  static constructDefaultMainDS() {
    return new LocalDataSource();
  }

  static constructDefaultMonitoringDS() {
    return new LocalDataSource({ whichDBServer: "monitoring" });
  }

  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  public connect(silenceInfoLogs?: boolean) {
    this.DS.initialize()
      .then(ds => {
        if (!silenceInfoLogs) {
          console.info("connected to datasource with options: \n");
          console.table(ds.options);
        }
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   *
   * @param silenceInfoLogs Don't log connection info.
   */
  public disconnect(silenceInfoLogs?: boolean) {
    this.DS.destroy()
      .then(() => {
        if (!silenceInfoLogs) console.info("disconnected from datasource");
      })
      .catch(error => {
        throw error;
      });
  }

  public getDS() {
    return this.DS;
  }
}

/**
 * Construct main datasource object with default options.
 *
 */
export const initializeMainDSWithDefaultOptions = () => LocalDataSource.constructDefaultMainDS();

/**
 * Construct monitoring datasource object with default options.
 */
export const initializeMonitoringDSWithDefaultOptions = () => LocalDataSource.constructDefaultMonitoringDS();

/**
 *  Construct datasource object.
 * @param opts Initialization options. {@link LocalDataSourceOpts | See implementation}
 */
export const initializeDS = (opts?: LocalDataSourceOpts) => new LocalDataSource(opts);

/**
 * Construct main datasource object with default options, and connect immediately.
 * @param silenceInfoLogs Don't log connection info.
 * @returns
 */
export const initializeConnectedMainDSWithDefaultOptions = (silenceInfoLogs?: boolean) => {
  try {
    const DS = LocalDataSource.constructDefaultMainDS();

    // Connect
    DS.connect(silenceInfoLogs);

    return DS;
  } catch (error: any) {
    console.error("an error occured while connecting. error message - %s", error.message);
    return null;
  }
};

/**
 * Construct monitoring datasource object with default options, and connect immediately.
 * @param silenceInfoLogs Don't log connection info.
 */
export const initializeConnectedMonitoringDSWithDefaultOptions = (silenceInfoLogs?: boolean) => {
  try {
    const DS = LocalDataSource.constructDefaultMonitoringDS();

    // Connect
    DS.connect(silenceInfoLogs);

    return DS;
  } catch (error: any) {
    console.error("an error occured while connecting. error message - %s", error.message);
    return null;
  }
};

/**
 * Construct datasource object, and connect immediately.
 * @param opts Initialization options. {@link LocalDataSourceOpts | See implementation}.
 * @param silenceInfoLogs Don't log connection info.
 * @returns
 */
export const initializeConnectedDS = (opts?: LocalDataSourceOpts, silenceInfoLogs?: boolean) => {
  try {
    const DS = new LocalDataSource(opts);

    // Connect
    DS.connect(silenceInfoLogs);

    return DS;
  } catch (error: any) {
    console.error("an error occured while connecting. error message - %s", error.message);
    return null;
  }
};
