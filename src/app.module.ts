import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { config } from './config/config';
import { ShipsModule } from './ships/ships.module';
import { DocksModule } from './docks/docks.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Set to false in production
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    }),
    AuthModule,
    UsersModule,
    ShipsModule,
    DocksModule,
    NotificationsModule,
  ],
})
export class AppModule {}
