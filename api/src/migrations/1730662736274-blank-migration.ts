import { MigrationInterface, QueryRunner } from 'typeorm';

export class BlankMigration1730662736274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "alumni"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
