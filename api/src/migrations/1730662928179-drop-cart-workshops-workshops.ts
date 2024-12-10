import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropCartWorkshopsWorkshops1730662928179
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cart_workshops_workshop" CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
