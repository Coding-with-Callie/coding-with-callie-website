import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChecklist1734190577827 implements MigrationInterface {
    name = 'AddChecklist1734190577827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "checklist" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "status" character varying NOT NULL DEFAULT 'To Do', "userId" integer, "parentListId" integer, CONSTRAINT "PK_e4b437f5107f2a9d5b744d4eb4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "rating" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checklist" ADD CONSTRAINT "FK_bf2fb8ba8a1465cb43fa48becf9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "checklist" ADD CONSTRAINT "FK_c5dc9f80a6bca3f38215591969b" FOREIGN KEY ("parentListId") REFERENCES "checklist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "checklist" DROP CONSTRAINT "FK_c5dc9f80a6bca3f38215591969b"`);
        await queryRunner.query(`ALTER TABLE "checklist" DROP CONSTRAINT "FK_bf2fb8ba8a1465cb43fa48becf9"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "rating" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "checklist"`);
    }

}
