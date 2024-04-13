import { MigrationInterface, QueryRunner } from "typeorm";

export class EditCartTable1710000593198 implements MigrationInterface {
    name = 'EditCartTable1710000593198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "REL_756f53ab9466eb52a52619ee01"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
