import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { Ship } from './ship.entity';
import { Dock } from '../docks/entities/dock.entity';
import { Users } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ship, Dock, Users])],
  providers: [ShipsService],
  controllers: [ShipsController],
})
export class ShipsModule {}
