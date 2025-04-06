import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DocksService } from './docks.service';
import { CreateDockDto } from './dto/create-dock.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('docks')
export class DocksController {
  constructor(private readonly docksService: DocksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDockDto: CreateDockDto, @Request() req) {
    return this.docksService.create(createDockDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.docksService.findAll();
  }
}
