import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditSubmissionsTable1712621843277 implements MigrationInterface {
  name = 'EditSubmissionsTable1712621843277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "course"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" ADD "course" character varying NOT NULL`,
    );
  }
}
