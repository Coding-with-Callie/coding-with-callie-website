import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoinTableToPage1735867347612 implements MigrationInterface {
    name = 'AddJoinTableToPage1735867347612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "page_resources_resource" ("pageId" integer NOT NULL, "resourceId" integer NOT NULL, CONSTRAINT "PK_3c23777adbf4ac3644ddb308077" PRIMARY KEY ("pageId", "resourceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3fbb846f8c6e163d9ed79013bb" ON "page_resources_resource" ("pageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_38b88ec4c09c189168814a1527" ON "page_resources_resource" ("resourceId") `);
        await queryRunner.query(`ALTER TABLE "page_resources_resource" ADD CONSTRAINT "FK_3fbb846f8c6e163d9ed79013bb8" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "page_resources_resource" ADD CONSTRAINT "FK_38b88ec4c09c189168814a15279" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page_resources_resource" DROP CONSTRAINT "FK_38b88ec4c09c189168814a15279"`);
        await queryRunner.query(`ALTER TABLE "page_resources_resource" DROP CONSTRAINT "FK_3fbb846f8c6e163d9ed79013bb8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38b88ec4c09c189168814a1527"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3fbb846f8c6e163d9ed79013bb"`);
        await queryRunner.query(`DROP TABLE "page_resources_resource"`);
    }

}
