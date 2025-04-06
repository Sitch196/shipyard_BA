import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedInitialDataXXXXXXXXXXXX implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Hash passwords
    const ownerPassword = await bcrypt.hash('owner123', 10);
    const captain1Password = await bcrypt.hash('captain1', 10);
    const captain2Password = await bcrypt.hash('captain2', 10);

    // Insert users
    await queryRunner.query(`
      INSERT INTO "users" ("email", "password", "name", "isShipyardOwner") VALUES
      ('owner@shipyard.com', '${ownerPassword}', 'John Shipyard', true),
      ('captain1@sea.com', '${captain1Password}', 'Captain Jack', false),
      ('captain2@sea.com', '${captain2Password}', 'Captain Morgan', false)
    `);

    // Insert docks
    await queryRunner.query(`
      INSERT INTO "dock" ("number", "capacity", "shipyardOwnerId") VALUES
      (1, 5, 1),
      (2, 3, 1),
      (3, 2, 1)
    `);

    // Insert ships
    await queryRunner.query(`
      INSERT INTO "ship" ("name", "crewCount", "yearBuilt", "captainId", "currentDockId", "dockedAt") VALUES
      ('Black Pearl', 50, 1990, 2, 1, NOW()),
      ('Flying Dutchman', 75, 1670, 3, 2, NOW()),
      ('Queen Anne''s Revenge', 60, 1710, 2, 3, NOW() - INTERVAL '2 days')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "ship"`);
    await queryRunner.query(`DELETE FROM "dock"`);
    await queryRunner.query(`DELETE FROM "user"`);
  }
}
