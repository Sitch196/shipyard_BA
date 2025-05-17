import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ships')
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShipDto: CreateShipDto, @Request() req) {
    return this.shipsService.create(createShipDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.shipsService.findAll();
  }
}
