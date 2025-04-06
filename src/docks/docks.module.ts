import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocksService } from './docks.service';
import { DocksController } from './docks.controller';
import { Dock } from './dock.entity';
import { Users } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dock, Users])],
  providers: [DocksService],
  controllers: [DocksController],
  exports: [DocksService],
})
export class DocksModule {}
