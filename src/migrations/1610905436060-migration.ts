import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1610905436060 implements MigrationInterface {
    name = 'migration1610905436060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "summary" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_tag"("id", "title", "summary") SELECT "id", "title", "summary" FROM "tag"`, undefined);
        await queryRunner.query(`DROP TABLE "tag"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_tag" RENAME TO "tag"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "summary" varchar NOT NULL, CONSTRAINT "UQ_4001044ed31ea4740eb05b1f157" UNIQUE ("title"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_tag"("id", "title", "summary") SELECT "id", "title", "summary" FROM "tag"`, undefined);
        await queryRunner.query(`DROP TABLE "tag"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_tag" RENAME TO "tag"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" RENAME TO "temporary_tag"`, undefined);
        await queryRunner.query(`CREATE TABLE "tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "summary" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "tag"("id", "title", "summary") SELECT "id", "title", "summary" FROM "temporary_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_tag"`, undefined);
        await queryRunner.query(`ALTER TABLE "tag" RENAME TO "temporary_tag"`, undefined);
        await queryRunner.query(`CREATE TABLE "tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "summary" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "tag"("id", "title", "summary") SELECT "id", "title", "summary" FROM "temporary_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_tag"`, undefined);
    }

}
