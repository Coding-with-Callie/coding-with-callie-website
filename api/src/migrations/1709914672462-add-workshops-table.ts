import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkshopsTable1709914672462 implements MigrationInterface {
    name = 'AddWorkshopsTable1709914672462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workshop" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "photo" character varying NOT NULL, "details" text array NOT NULL, "objectives" text array NOT NULL, "techStack" text array NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_e755b83ccf7c711f998012e1c92" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workshop"`);
    }

}
