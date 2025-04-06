import { DataSource } from 'typeorm';
import { SeedInitialDataXXXXXXXXXXXX } from './migrations/1743879512811-SeedInitialData';
import { RenameUserToUsersXXXXXXXXXXXX } from './migrations/1743880660387-RenameUserToUsers';
async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Jme24in!',
    database: 'postgres',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
  });

  await dataSource.initialize();

  const seedMigration = new SeedInitialDataXXXXXXXXXXXX();
  const changeUserToUsers = new RenameUserToUsersXXXXXXXXXXXX();
  await seedMigration.up(dataSource.createQueryRunner());
  await changeUserToUsers.up(dataSource.createQueryRunner());

  console.log('Seed data inserted successfully!');
  await dataSource.destroy();
}

runSeed().catch((error) => {
  console.error('Error running seed:', error);
});
