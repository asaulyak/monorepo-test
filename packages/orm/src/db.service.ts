import {
  BaseEntity,
  Connection,
  createConnection,
  DeepPartial,
  EntityManager,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  getConnection,
  ObjectType,
  Repository,
  SelectQueryBuilder,
} from './typeorm';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';
import {ConnectionConfig} from './connections';
import {DI} from './di';

export class DbService {
  get isConnected(): boolean {
    return !!this.connection && this.connection.isConnected;
  }

  private connection: Connection | undefined;

  public static create() {
    return DI.singleton(DbService);
  }

  public async connect(): Promise<void> {
    this.connection = await createConnection(ConnectionConfig.create().getConnectionConfig());
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }

  public getConnection() {
    if (!this.connection) {
      throw new Error('Connection not set');
    }

    const connectionName = this.connection.name;
    return getConnection(connectionName);
  }

  public find<Entity>(
    entityClass: ObjectType<Entity>,
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<Array<Entity>> {
    return this.getManager().find(entityClass, optionsOrConditions);
  }

  public findOne<Entity>(
    entityClass: ObjectType<Entity>,
    idOrOptionsOrConditions: number | string | FindOneOptions<Entity> | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>,
  ) {
    if (typeof idOrOptionsOrConditions === 'object') {
      return this.getManager().findOne(entityClass, idOrOptionsOrConditions);
    }

    return this.getManager().findOne(entityClass, idOrOptionsOrConditions, maybeOptions);
  }

  public findOneOrFail<Entity>(
    entityClass: ObjectType<Entity>,
    idOrOptionsOrConditions: number | string | FindOneOptions<Entity>,
    maybeOptions?: FindOneOptions<Entity> | FindConditions<Entity>,
  ) {
    if (typeof idOrOptionsOrConditions === 'object') {
      return this.getManager().findOneOrFail(entityClass, idOrOptionsOrConditions as FindOneOptions<Entity>);
    }

    return this.getManager().findOneOrFail(entityClass, idOrOptionsOrConditions, maybeOptions);
  }

  public count<Entity extends BaseEntity>(
    entityClass: ObjectType<Entity>,
    options?: FindManyOptions<Entity>,
  ): Promise<number> {
    return this.getManager().count(entityClass, options);
  }

  public getManager(): EntityManager {
    if (!this.connection) {
      throw new Error('Create connection first');
    }
    return this.connection.manager;
  }

  public getRepository<Entity extends BaseEntity>(entityClass: ObjectType<Entity>): Repository<Entity> {
    return this.getManager().getRepository(entityClass);
  }

  public insert<Entity extends BaseEntity>(
    entityClass: ObjectType<Entity>,
    data: DeepPartial<Entity>,
  ): Promise<Entity> {
    return this.getManager().create(entityClass, data).save();
  }

  public update<Entity extends BaseEntity>(
    entityClass: ObjectType<Entity>,
    criteria: any,
    data: QueryDeepPartialEntity<Entity>,
  ) {
    return this.getManager().update(entityClass, criteria, data);
  }

  public preload<Entity extends BaseEntity>(entityClass: ObjectType<Entity>, data: DeepPartial<Entity>) {
    return this.getManager().preload(entityClass, data);
  }

  public delete<Entity extends BaseEntity>(
    entityClass: ObjectType<Entity>,
    idOrOptionsOrConditions: number | string | FindOneOptions<Entity> | FindConditions<Entity>,
  ) {
    return this.getManager().delete(entityClass, idOrOptionsOrConditions);
  }

  public async insertMany<Entity extends BaseEntity>(
    entityClass: ObjectType<Entity>,
    data: Array<QueryDeepPartialEntity<Entity>>,
    countInChunk = 500,
  ): Promise<void> {
    for (let i = 0, j = data.length; i < j; i += countInChunk) {
      const chunkInsert = data.slice(i, i + countInChunk);
      await this.getBuilder().insert().into(entityClass).values(chunkInsert).execute();
    }
  }

  public truncate<Entity extends BaseEntity>(entityClass: ObjectType<Entity>, options: any = {}) {
    if (!this.connection) {
      throw new Error('Create connection first');
    }

    const modelInfo = this.connection.getMetadata(entityClass);
    const schema = modelInfo.schema;
    const tableName = modelInfo.tableName;

    const extra = [];

    if (options.restart) {
      extra.push('RESTART IDENTITY');
    }

    if (options.cascade) {
      extra.push('CASCADE');
    }

    const tableRelation = schema ? `${schema}.${tableName}` : tableName;

    return this.query(`TRUNCATE TABLE ${tableRelation} ${extra.join(' ')}`);
  }

  public getBuilder(): SelectQueryBuilder<any> {
    if (!this.connection) {
      throw new Error('Create connection first');
    }
    return this.getManager().createQueryBuilder();
  }

  public query(sql: string): Promise<any> {
    return this.getManager().query(sql);
  }
}
