import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;

const baseConfig = {
  type: 'postgres' as const,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

export const AppDataSource = new DataSource(
  databaseUrl && isProduction
    ? {
        ...baseConfig,
        url: databaseUrl,
        ssl: { rejectUnauthorized: false },
      }
    : {
        ...baseConfig,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'Jme24in!',
        database: process.env.DB_NAME || 'postgres',
      },
);
