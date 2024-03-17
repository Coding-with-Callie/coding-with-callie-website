import { MigrationInterface, QueryRunner } from "typeorm";

export class EditUserTableToManyToMany1710697421581 implements MigrationInterface {
    name = 'EditUserTableToManyToMany1710697421581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" DROP CONSTRAINT "FK_f97638a74e76533bbcd75da7c2e"`);
        await queryRunner.query(`CREATE TABLE "users_workshops_workshop" ("usersId" integer NOT NULL, "workshopId" integer NOT NULL, CONSTRAINT "PK_3893188d06ae8f7ae081e0ac471" PRIMARY KEY ("usersId", "workshopId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9751a00de6ac59568f52a8730e" ON "users_workshops_workshop" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cfa745597ba2eb250177b6ba35" ON "users_workshops_workshop" ("workshopId") `);
        await queryRunner.query(`ALTER TABLE "workshop" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users_workshops_workshop" ADD CONSTRAINT "FK_9751a00de6ac59568f52a8730e2" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_workshops_workshop" ADD CONSTRAINT "FK_cfa745597ba2eb250177b6ba357" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_workshops_workshop" DROP CONSTRAINT "FK_cfa745597ba2eb250177b6ba357"`);
        await queryRunner.query(`ALTER TABLE "users_workshops_workshop" DROP CONSTRAINT "FK_9751a00de6ac59568f52a8730e2"`);
        await queryRunner.query(`ALTER TABLE "workshop" ADD "userId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cfa745597ba2eb250177b6ba35"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9751a00de6ac59568f52a8730e"`);
        await queryRunner.query(`DROP TABLE "users_workshops_workshop"`);
        await queryRunner.query(`ALTER TABLE "workshop" ADD CONSTRAINT "FK_f97638a74e76533bbcd75da7c2e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
