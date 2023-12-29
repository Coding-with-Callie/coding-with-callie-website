import { MigrationInterface, QueryRunner } from "typeorm";

export class Feedback1703773592767 implements MigrationInterface {
    name = 'Feedback1703773592767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feedback" ("id" SERIAL NOT NULL, "positiveFeedback" character varying NOT NULL, "immediateChangesRequested" character varying NOT NULL, "longTermChangesRequested" character varying NOT NULL, "feedbackProviderId" integer NOT NULL, "submissionId" integer NOT NULL, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_dbbdf539ad9526dc226612974f6" FOREIGN KEY ("feedbackProviderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_ae2f58b7d0fa9be21519af3d457" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_ae2f58b7d0fa9be21519af3d457"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_dbbdf539ad9526dc226612974f6"`);
        await queryRunner.query(`DROP TABLE "feedback"`);
    }

}
