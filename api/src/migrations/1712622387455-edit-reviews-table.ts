import { MigrationInterface, QueryRunner } from "typeorm";

export class EditReviewsTable1712622387455 implements MigrationInterface {
    name = 'EditReviewsTable1712622387455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" ADD "workshopId" integer`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_15097e0bca7706dd7e272ca181a" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_15097e0bca7706dd7e272ca181a"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "workshopId"`);
    }

}
