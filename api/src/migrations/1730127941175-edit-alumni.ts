import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditAlumni1730127941175 implements MigrationInterface {
  name = 'EditAlumni1730127941175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resource" ("id" SERIAL NOT NULL, "heading" character varying NOT NULL, "bodyText" character varying NOT NULL, "imageUrl" character varying NOT NULL, "buttonText" character varying NOT NULL, "linkUrl" character varying NOT NULL, "target" boolean NOT NULL, CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "resource"`);
  }
}
