import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditSubmissionsTable1712533938728 implements MigrationInterface {
  name = 'EditSubmissionsTable1712533938728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "submissions" ADD "workshopId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "submissions" ADD CONSTRAINT "FK_d305533ba242065febdbbcaceb4" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "submissions" DROP CONSTRAINT "FK_d305533ba242065febdbbcaceb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "submissions" DROP COLUMN "workshopId"`,
    );
  }
}
