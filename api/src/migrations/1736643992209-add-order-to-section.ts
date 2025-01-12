import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderToSection1736643992209 implements MigrationInterface {
    name = 'AddOrderToSection1736643992209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section" ADD "order" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "order"`);
    }

}
