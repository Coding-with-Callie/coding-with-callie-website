import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropUserWorkshopsWorkshopTable1730663145815
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users_workshops_workshop" CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
