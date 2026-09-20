import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepositosService } from './depositos.service.js';
import { CreateDepositoDto } from './dto/create-deposito.dto.js';
import { UpdateDepositoDto } from './dto/update-deposito.dto.js';

@Controller('depositos')
export class DepositosController {
  constructor(private readonly depositosService: DepositosService) {}

  @Post()
  create(@Body() createDepositoDto: CreateDepositoDto) {
    return this.depositosService.create(createDepositoDto);
  }

  @Get()
  findAll() {
    return this.depositosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depositosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepositoDto: UpdateDepositoDto) {
    return this.depositosService.update(+id, updateDepositoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depositosService.remove(+id);
  }
}
