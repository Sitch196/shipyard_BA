import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShipsModule } from './ships/ships.module';
import { DocksModule } from './docks/docks.module';
import { Users } from './users/user.entity';
import { Ship } from './ships/ship.entity';
import { Dock } from './docks/entities/dock.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): PostgresConnectionOptions => {
        const isDevelopment = configService.get('NODE_ENV') !== 'production';
        const databaseUrl = configService.get('DATABASE_URL');

        return {
          type: 'postgres',
          ...(databaseUrl
            ? {
                url: databaseUrl,
                ssl: {
                  rejectUnauthorized: false,
                },
              }
            : {
                host: configService.get('DB_HOST', 'localhost'),
                port: parseInt(configService.get('DB_PORT', '5432')),
                username: configService.get('DB_USERNAME', 'postgres'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME', 'postgres'),
              }),
          entities: [Users, Ship, Dock],
          synchronize: isDevelopment,
        } as PostgresConnectionOptions;
      },
    }),
    AuthModule,
    UsersModule,
    ShipsModule,
    DocksModule,
  ],
})
export class AppModule {}
