import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeColumnToSpeakerTable1708782144550 implements MigrationInterface {
    name = 'AddTimeColumnToSpeakerTable1708782144550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "speaker" ADD "time" character varying NOT NULL DEFAULT '8PM EST'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "speaker" DROP COLUMN "time"`);
    }

}
