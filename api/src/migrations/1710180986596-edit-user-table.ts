import { MigrationInterface, QueryRunner } from "typeorm";

export class EditUserTable1710180986596 implements MigrationInterface {
    name = 'EditUserTable1710180986596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "workshop" ADD CONSTRAINT "FK_f97638a74e76533bbcd75da7c2e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" DROP CONSTRAINT "FK_f97638a74e76533bbcd75da7c2e"`);
        await queryRunner.query(`ALTER TABLE "workshop" DROP COLUMN "userId"`);
    }

}
