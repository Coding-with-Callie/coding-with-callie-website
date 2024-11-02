import { MigrationInterface, QueryRunner } from "typeorm";

export class EditAlumni1730504739729 implements MigrationInterface {
    name = 'EditAlumni1730504739729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "order" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "order" SET DEFAULT '1'`);
    }

}
