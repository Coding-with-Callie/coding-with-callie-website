import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAlumniTable1713185737411 implements MigrationInterface {
    name = 'AddAlumniTable1713185737411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alumni" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "opportunities" text array NOT NULL, "bioText" text array NOT NULL, "linkedInUrl" character varying NOT NULL, "photoUrl" character varying NOT NULL, "projectUrl" character varying NOT NULL, "workshopId" integer, CONSTRAINT "PK_6947d90e8215d18adec98799895" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "alumni" ADD CONSTRAINT "FK_62df7779ff149f32292849fefbf" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alumni" DROP CONSTRAINT "FK_62df7779ff149f32292849fefbf"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
        await queryRunner.query(`DROP TABLE "alumni"`);
    }

}
