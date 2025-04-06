import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserToUsersXXXXXXXXXXXX implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. First rename the table
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "users"`);

    // 2. Update all foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "dock" RENAME COLUMN "shipyardOwnerId" TO "shipyardOwnerId_temp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dock" ADD COLUMN "shipyardOwnerId" integer`,
    );
    await queryRunner.query(
      `UPDATE "dock" SET "shipyardOwnerId" = "shipyardOwnerId_temp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dock" DROP COLUMN "shipyardOwnerId_temp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dock" ADD CONSTRAINT "FK_xxxxxxxxxxxx" FOREIGN KEY ("shipyardOwnerId") REFERENCES "users"("id")`,
    );

    await queryRunner.query(
      `ALTER TABLE "ship" RENAME COLUMN "captainId" TO "captainId_temp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ship" ADD COLUMN "captainId" integer`,
    );
    await queryRunner.query(`UPDATE "ship" SET "captainId" = "captainId_temp"`);
    await queryRunner.query(`ALTER TABLE "ship" DROP COLUMN "captainId_temp"`);
    await queryRunner.query(
      `ALTER TABLE "ship" ADD CONSTRAINT "FK_xxxxxxxxxxxx" FOREIGN KEY ("captainId") REFERENCES "users"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverse the changes if needed
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "user"`);

    await queryRunner.query(
      `ALTER TABLE "dock" RENAME COLUMN "shipyardOwnerId" TO "shipyardOwnerId_temp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dock" ADD COLUMN "shipyardOwnerId" integer`,
    );
    await queryRunner.query(
      `UPDATE "dock" SET "shipyardOwnerId" = "shipyardOwnerId_temp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dock" DROP COLUMN "shipyardOwnerId_temp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dock" ADD CONSTRAINT "FK_xxxxxxxxxxxx" FOREIGN KEY ("shipyardOwnerId") REFERENCES "user"("id")`,
    );

    await queryRunner.query(
      `ALTER TABLE "ship" RENAME COLUMN "captainId" TO "captainId_temp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ship" ADD COLUMN "captainId" integer`,
    );
    await queryRunner.query(`UPDATE "ship" SET "captainId" = "captainId_temp"`);
    await queryRunner.query(`ALTER TABLE "ship" DROP COLUMN "captainId_temp"`);
    await queryRunner.query(
      `ALTER TABLE "ship" ADD CONSTRAINT "FK_xxxxxxxxxxxx" FOREIGN KEY ("captainId") REFERENCES "user"("id")`,
    );
  }
}
