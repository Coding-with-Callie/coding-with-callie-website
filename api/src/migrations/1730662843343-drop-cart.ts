import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropCart1730662843343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cart" CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
