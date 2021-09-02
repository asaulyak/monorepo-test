import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateSchemas1630487721802 implements MigrationInterface {
  public SCHEMA_DASHBOARD = 'dashboard';
  public SCHEMA_DEV = 'dev';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createSchema(this.SCHEMA_DASHBOARD, true);
    await queryRunner.createSchema(this.SCHEMA_DEV, true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropSchema(this.SCHEMA_DEV);
    await queryRunner.dropSchema(this.SCHEMA_DASHBOARD);
  }
}
