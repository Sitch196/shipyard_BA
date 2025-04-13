import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ship } from './ship.entity';
import { CreateShipDto } from './dto/create-ship.dto';
import { Users } from '../users/user.entity';
import { Dock } from '../docks/entities/dock.entity';

@Injectable()
export class ShipsService {
  constructor(
    @InjectRepository(Ship)
    private shipsRepository: Repository<Ship>,
    @InjectRepository(Dock)
    private docksRepository: Repository<Dock>,
  ) {}

  async create(createShipDto: CreateShipDto, captain: Users): Promise<Ship> {
    const dock = await this.docksRepository.findOne({
      where: { id: createShipDto.dockId },
    });

    if (!dock) {
      throw new Error('Dock not found');
    }

    const ship = this.shipsRepository.create({
      ...createShipDto,
      captain,
      currentDock: dock,
      dockedAt: new Date(),
    });

    return this.shipsRepository.save(ship);
  }

  async findAll(): Promise<Ship[]> {
    return this.shipsRepository.find({ relations: ['captain', 'currentDock'] });
  }

  async findByCaptain(captainId: number): Promise<Ship[]> {
    return this.shipsRepository.find({
      where: { captain: { id: captainId } },
      relations: ['currentDock'],
    });
  }
}
