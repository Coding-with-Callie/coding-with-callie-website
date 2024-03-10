import { MigrationInterface, QueryRunner } from "typeorm";

export class EditWorkshopTable1710110951642 implements MigrationInterface {
    name = 'EditWorkshopTable1710110951642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" ADD "stripe_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" DROP COLUMN "stripe_id"`);
    }

}
