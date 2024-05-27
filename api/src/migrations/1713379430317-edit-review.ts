import { MigrationInterface, QueryRunner } from "typeorm";

export class EditReview1713379430317 implements MigrationInterface {
    name = 'EditReview1713379430317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_15097e0bca7706dd7e272ca181a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "session"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "workshopId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "workshop" DROP COLUMN "available"`);
        await queryRunner.query(`ALTER TABLE "workshop" DROP COLUMN "stripeId"`);
        await queryRunner.query(`ALTER TABLE "workshop" DROP COLUMN "sessions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workshop" ADD "sessions" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workshop" ADD "stripeId" character varying`);
        await queryRunner.query(`ALTER TABLE "workshop" ADD "available" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "review" ADD "workshopId" integer`);
        await queryRunner.query(`ALTER TABLE "review" ADD "session" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_15097e0bca7706dd7e272ca181a" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
