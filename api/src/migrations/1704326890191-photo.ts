import { MigrationInterface, QueryRunner } from "typeorm";

export class Photo1704326890191 implements MigrationInterface {
    name = 'Photo1704326890191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "photo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photo"`);
    }

}
