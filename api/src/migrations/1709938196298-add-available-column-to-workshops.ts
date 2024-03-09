import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvailableColumnToWorkshops1709938196298 implements MigrationInterface {
    name = 'AddAvailableColumnToWorkshops1709938196298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" ADD "available" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" DROP COLUMN "available"`);
    }

}
