import { MigrationInterface, QueryRunner } from "typeorm";

export class EditAlumni1723855208171 implements MigrationInterface {
    name = 'EditAlumni1723855208171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workshop" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "photo" character varying NOT NULL, "details" text array NOT NULL, "objectives" text array NOT NULL, "techStack" text array NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_e755b83ccf7c711f998012e1c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alumni" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "opportunities" text array NOT NULL, "bioText" text array NOT NULL, "linkedInUrl" character varying NOT NULL, "photoUrl" character varying NOT NULL, "projectUrl" character varying NOT NULL, "demoUrl" character varying, "workshopId" integer, CONSTRAINT "PK_6947d90e8215d18adec98799895" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "comments" character varying NOT NULL, "displayName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "photo" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "userId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'To Do', "userStoryId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_story" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "featureId" integer, CONSTRAINT "PK_cd6f5a48fae7109fbc55f19720e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feature" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "projectId" integer, CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "message" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "speaker" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" character varying NOT NULL, "time" character varying NOT NULL DEFAULT '8PM EST', "sessionText" text array NOT NULL, "bioText" text array NOT NULL, "websiteUrl" character varying NOT NULL, "photoUrl" character varying NOT NULL, "sessionRecordingUrl" character varying, CONSTRAINT "PK_8441432fc32d602d417bf2687a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "alumni" ADD CONSTRAINT "FK_62df7779ff149f32292849fefbf" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_b1500fa73277080dc0d730f2316" FOREIGN KEY ("userStoryId") REFERENCES "user_story"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD CONSTRAINT "FK_65784c20d2a4562774fa196596c" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feature" ADD CONSTRAINT "FK_f91cf97e77a2abd7df67ca1748f" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feature" DROP CONSTRAINT "FK_f91cf97e77a2abd7df67ca1748f"`);
        await queryRunner.query(`ALTER TABLE "user_story" DROP CONSTRAINT "FK_65784c20d2a4562774fa196596c"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_b1500fa73277080dc0d730f2316"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "alumni" DROP CONSTRAINT "FK_62df7779ff149f32292849fefbf"`);
        await queryRunner.query(`DROP TABLE "speaker"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "feature"`);
        await queryRunner.query(`DROP TABLE "user_story"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "alumni"`);
        await queryRunner.query(`DROP TABLE "workshop"`);
    }

}
