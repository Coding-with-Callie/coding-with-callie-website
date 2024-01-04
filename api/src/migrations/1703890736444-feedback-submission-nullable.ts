import { MigrationInterface, QueryRunner } from 'typeorm';

export class FeedbackSubmissionNullable1703890736444
  implements MigrationInterface
{
  name = 'FeedbackSubmissionNullable1703890736444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "feedback" DROP CONSTRAINT "FK_ae2f58b7d0fa9be21519af3d457"`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedback" ALTER COLUMN "submissionId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedback" ADD CONSTRAINT "FK_ae2f58b7d0fa9be21519af3d457" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "feedback" DROP CONSTRAINT "FK_ae2f58b7d0fa9be21519af3d457"`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedback" ALTER COLUMN "submissionId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedback" ADD CONSTRAINT "FK_ae2f58b7d0fa9be21519af3d457" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
