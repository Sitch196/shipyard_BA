import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { Ship } from './ship.entity';
import { Dock } from '../docks/dock.entity';
import { Users } from '../users/user.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ship, Dock, Users]), NotificationsModule],
  providers: [ShipsService],
  controllers: [ShipsController],
})
export class ShipsModule {}
