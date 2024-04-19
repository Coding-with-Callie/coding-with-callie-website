import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditAlumni1713538814424 implements MigrationInterface {
  name = 'EditAlumni1713538814424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alumni" ADD "demoUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "alumni" DROP COLUMN "demoUrl"`);
  }
}
