import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dock } from './entities/dock.entity';
import { CreateDockDto } from './dto/create-dock.dto';
import { Users } from '../users/user.entity';

@Injectable()
export class DocksService {
  constructor(
    @InjectRepository(Dock)
    private docksRepository: Repository<Dock>,
  ) {}

  async create(
    createDockDto: CreateDockDto,
    shipyardOwner: Users,
  ): Promise<Dock> {
    const dock = this.docksRepository.create({
      ...createDockDto,
      shipyardOwner,
    });
    return this.docksRepository.save(dock);
  }

  async findAll(): Promise<Dock[]> {
    return this.docksRepository.find({ relations: ['shipyardOwner'] });
  }

  async findOne(id: number): Promise<Dock | undefined> {
    const dock = await this.docksRepository.findOne({
      where: { id },
      relations: ['shipyardOwner'],
    });
    return dock ?? undefined;
  }
}
