import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionsToWorkshop1712516692515 implements MigrationInterface {
    name = 'AddSessionsToWorkshop1712516692515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" ADD "sessions" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" DROP COLUMN "sessions"`);
    }

}
