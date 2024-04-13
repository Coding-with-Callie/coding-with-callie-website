import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionsToWorkshop1712522070774 implements MigrationInterface {
    name = 'AddSessionsToWorkshop1712522070774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" RENAME COLUMN "stripe_id" TO "stripeId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" RENAME COLUMN "stripeId" TO "stripe_id"`);
    }

}
