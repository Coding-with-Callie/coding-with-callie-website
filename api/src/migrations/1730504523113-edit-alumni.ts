import { MigrationInterface, QueryRunner } from "typeorm";

export class EditAlumni1730504523113 implements MigrationInterface {
    name = 'EditAlumni1730504523113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" ADD "order" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "order"`);
    }

}
