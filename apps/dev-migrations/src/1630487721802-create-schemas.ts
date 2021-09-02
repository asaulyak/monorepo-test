import {MigrationInterface, QueryRunner, Table, TableColumn} from 'typeorm';

export class CreateSchemas1630487721802 implements MigrationInterface {
  private SCHEMA_PUBLIC = 'public';
  private table = new Table({
    name: `${this.SCHEMA_PUBLIC}.user`,
    columns: [
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),

      new TableColumn({
        name: 'username',
        type: 'varchar',
      }),
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.createSchema(this.SCHEMA_PUBLIC, true);
    await queryRunner.createTable(this.table);
    await queryRunner.query(`INSERT INTO ${this.table.name} (username) VALUES('mono user')`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
    await queryRunner.dropSchema(this.SCHEMA_PUBLIC);
  }
}
