import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSpeakersTable1708175129252 implements MigrationInterface {
  name = 'AddSpeakersTable1708175129252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "speaker" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" character varying NOT NULL, "sessionText" text array NOT NULL, "bioText" text array NOT NULL, "websiteUrl" character varying NOT NULL, "photoUrl" character varying NOT NULL, CONSTRAINT "PK_8441432fc32d602d417bf2687a9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "speaker"`);
  }
}
