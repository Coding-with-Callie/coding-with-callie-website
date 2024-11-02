import { MigrationInterface, QueryRunner } from "typeorm";

export class EditAlumni1730128537892 implements MigrationInterface {
    name = 'EditAlumni1730128537892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "bodyText"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "bodyText" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "bodyText"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "bodyText" character varying NOT NULL`);
    }

}
