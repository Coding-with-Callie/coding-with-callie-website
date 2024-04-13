import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCartTable1709942608750 implements MigrationInterface {
    name = 'AddCartTable1709942608750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_workshops_workshop" ("cartId" integer NOT NULL, "workshopId" integer NOT NULL, CONSTRAINT "PK_d1d839084c9594cca3bff6706f7" PRIMARY KEY ("cartId", "workshopId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4951f1a623b4b4956c338d9225" ON "cart_workshops_workshop" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f7703f182154497a6487480e8e" ON "cart_workshops_workshop" ("workshopId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_workshops_workshop" ADD CONSTRAINT "FK_4951f1a623b4b4956c338d92252" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_workshops_workshop" ADD CONSTRAINT "FK_f7703f182154497a6487480e8e9" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_workshops_workshop" DROP CONSTRAINT "FK_f7703f182154497a6487480e8e9"`);
        await queryRunner.query(`ALTER TABLE "cart_workshops_workshop" DROP CONSTRAINT "FK_4951f1a623b4b4956c338d92252"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cartId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7703f182154497a6487480e8e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4951f1a623b4b4956c338d9225"`);
        await queryRunner.query(`DROP TABLE "cart_workshops_workshop"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
