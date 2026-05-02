import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePost1777653326931 implements MigrationInterface {
    name = 'CreatePost1777653326931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" text, "tag" character varying(255), "image" text array, "upload_by" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_d2e681c7bdaecd8872fe44435b7" FOREIGN KEY ("upload_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_d2e681c7bdaecd8872fe44435b7"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
