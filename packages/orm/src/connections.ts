import {SnakeNamingStrategy} from 'typeorm-naming-strategies';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {DI} from './di';

export class ConnectionConfig {
  public static create() {
    return DI.singleton(ConnectionConfig);
  }

  private connectionConfig: PostgresConnectionOptions;
  private overrideOptions: Partial<PostgresConnectionOptions> = {};

  public get defaultOptions() {
    return {
      name: 'default',
      type: 'postgres',
      extra: {
        min: 1,
        max: 30,
      },
      entities: [`${__dirname}/models/*.js`],
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
    };
  }

  public getConnectionConfig() {
    if (!this.connectionConfig) {
      const defaultConfig = this.defaultOptions;
      this.connectionConfig = {
        ...defaultConfig,
        ...this.overrideOptions,
      } as PostgresConnectionOptions;
      if (!this.connectionConfig.url) {
        throw new Error('DB url not set');
      }
    }

    return this.connectionConfig;
  }

  public patchConfigOption(config: Partial<PostgresConnectionOptions>) {
    this.mergeOverrideOptions(config);
    return this;
  }



  private mergeOverrideOptions(config: Partial<PostgresConnectionOptions>) {
    this.overrideOptions = {
      ...this.overrideOptions,
      ...config,
    };
  }
}
