import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecordingColumnToSpeakerTable1708781080846 implements MigrationInterface {
    name = 'AddRecordingColumnToSpeakerTable1708781080846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "speaker" ADD "sessionRecordingUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "speaker" DROP COLUMN "sessionRecordingUrl"`);
    }

}
