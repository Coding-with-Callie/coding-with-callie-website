import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropSubmissionsTable1730663065283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "submissions" CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
