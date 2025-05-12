import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialSchema1743880660388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id" SERIAL PRIMARY KEY,
                "email" VARCHAR NOT NULL UNIQUE,
                "password" VARCHAR NOT NULL,
                "name" VARCHAR NOT NULL,
                "isShipyardOwner" BOOLEAN NOT NULL DEFAULT false
            );
        `);

    // Create docks table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "dock" (
                "id" SERIAL PRIMARY KEY,
                "number" INTEGER NOT NULL,
                "capacity" INTEGER NOT NULL,
                "shipyardOwnerId" INTEGER,
                FOREIGN KEY ("shipyardOwnerId") REFERENCES "users"("id")
            );
        `);

    // Create ships table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "ship" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR NOT NULL,
                "crewCount" INTEGER NOT NULL,
                "yearBuilt" INTEGER NOT NULL,
                "captainId" INTEGER,
                "currentDockId" INTEGER,
                "dockedAt" TIMESTAMP,
                FOREIGN KEY ("captainId") REFERENCES "users"("id"),
                FOREIGN KEY ("currentDockId") REFERENCES "dock"("id")
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "ship";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dock";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users";`);
  }
}
