import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ship } from './ship.entity';
import { CreateShipDto, ShipDto, toShipDto } from '../shared/dto/ship.dto';
import { handleServiceError } from '../shared/utils/error-handling';

@Injectable()
export class ShipsService {
  constructor(
    @InjectRepository(Ship)
    private shipsRepository: Repository<Ship>,
  ) {}

  async create(createShipDto: CreateShipDto): Promise<ShipDto | never> {
    try {
      const ship = this.shipsRepository.create(createShipDto);
      const savedShip = await this.shipsRepository.save(ship);
      return toShipDto(savedShip);
    } catch (error) {
      return handleServiceError(error, 'Failed to create ship');
    }
  }

  async findAll(): Promise<ShipDto[] | never> {
    try {
      const ships = await this.shipsRepository.find();
      return ships.map(toShipDto);
    } catch (error) {
      return handleServiceError(error, 'Failed to fetch ships');
    }
  }

  async findOne(id: number): Promise<ShipDto | never> {
    try {
      const ship = await this.shipsRepository.findOneOrFail({ where: { id } });
      return toShipDto(ship);
    } catch (error) {
      return handleServiceError(error, `Ship with ID ${id} not found`);
    }
  }

  async update(
    id: number,
    updateShipDto: Partial<CreateShipDto>,
  ): Promise<ShipDto | never> {
    try {
      await this.shipsRepository.update(id, updateShipDto);
      const updatedShip = await this.shipsRepository.findOneOrFail({
        where: { id },
      });
      return toShipDto(updatedShip);
    } catch (error) {
      return handleServiceError(error, `Failed to update ship with ID ${id}`);
    }
  }

  async remove(id: number): Promise<void | never> {
    try {
      const result = await this.shipsRepository.delete(id);
      if (result.affected === 0) {
        return handleServiceError(
          new Error(`Ship with ID ${id} not found`),
          '',
        );
      }
    } catch (error) {
      return handleServiceError(error, `Failed to delete ship with ID ${id}`);
    }
  }
}
