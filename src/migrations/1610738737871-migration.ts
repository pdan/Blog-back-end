import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1610738737871 implements MigrationInterface {
    name = 'migration1610738737871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "family" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`CREATE TABLE "tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "summary" varchar NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "summary" varchar NOT NULL, "created" integer NOT NULL, "userId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "post_tags_tag" ("postId" integer NOT NULL, "tagId" integer NOT NULL, PRIMARY KEY ("postId", "tagId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b651178cc41334544a7a9601c4" ON "post_tags_tag" ("postId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_41e7626b9cc03c5c65812ae55e" ON "post_tags_tag" ("tagId") `, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "summary" varchar NOT NULL, "created" integer NOT NULL, "userId" integer, CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "content", "summary", "created", "userId") SELECT "id", "title", "content", "summary", "created", "userId" FROM "post"`, undefined);
        await queryRunner.query(`DROP TABLE "post"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b651178cc41334544a7a9601c4"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_41e7626b9cc03c5c65812ae55e"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_post_tags_tag" ("postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "FK_b651178cc41334544a7a9601c45" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_41e7626b9cc03c5c65812ae55e8" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("postId", "tagId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_post_tags_tag"("postId", "tagId") SELECT "postId", "tagId" FROM "post_tags_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "post_tags_tag"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_post_tags_tag" RENAME TO "post_tags_tag"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b651178cc41334544a7a9601c4" ON "post_tags_tag" ("postId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_41e7626b9cc03c5c65812ae55e" ON "post_tags_tag" ("tagId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_41e7626b9cc03c5c65812ae55e"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b651178cc41334544a7a9601c4"`, undefined);
        await queryRunner.query(`ALTER TABLE "post_tags_tag" RENAME TO "temporary_post_tags_tag"`, undefined);
        await queryRunner.query(`CREATE TABLE "post_tags_tag" ("postId" integer NOT NULL, "tagId" integer NOT NULL, PRIMARY KEY ("postId", "tagId"))`, undefined);
        await queryRunner.query(`INSERT INTO "post_tags_tag"("postId", "tagId") SELECT "postId", "tagId" FROM "temporary_post_tags_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_post_tags_tag"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_41e7626b9cc03c5c65812ae55e" ON "post_tags_tag" ("tagId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b651178cc41334544a7a9601c4" ON "post_tags_tag" ("postId") `, undefined);
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`, undefined);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "summary" varchar NOT NULL, "created" integer NOT NULL, "userId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "content", "summary", "created", "userId") SELECT "id", "title", "content", "summary", "created", "userId" FROM "temporary_post"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_post"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_41e7626b9cc03c5c65812ae55e"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b651178cc41334544a7a9601c4"`, undefined);
        await queryRunner.query(`DROP TABLE "post_tags_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "post"`, undefined);
        await queryRunner.query(`DROP TABLE "tag"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
