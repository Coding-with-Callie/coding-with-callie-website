import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPageAndSection1735912633241 implements MigrationInterface {
    name = 'AddPageAndSection1735912633241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "data" json NOT NULL, "pageId" integer, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "path" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_73a502c62159d28900594ba710e" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "page" ADD CONSTRAINT "FK_ae1d917992dd0c9d9bbdad06c4a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page" DROP CONSTRAINT "FK_ae1d917992dd0c9d9bbdad06c4a"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_73a502c62159d28900594ba710e"`);
        await queryRunner.query(`DROP TABLE "page"`);
        await queryRunner.query(`DROP TABLE "section"`);
    }

}
