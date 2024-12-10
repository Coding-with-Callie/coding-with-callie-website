import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropFeedbackTable1730663020971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "feedback" CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
