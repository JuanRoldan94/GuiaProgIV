import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service.js';
import { CreateCategoriaNivel1Dto } from './dto/create-categoria-nivel1-dto.js';
import { UpdateCategoriaDto } from './dto/update-categoria.dto.js';
import { CreateCategoriaNivel2Dto } from './dto/create-categoria-nivel2-dto.js';


@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get('jerarquia')
  obtenerJerarquia() {
    return this.categoriasService.obtenerJerarquia();
  }

  // RUTAS NIVEL 1
  @Post('nivel-1')
  createNivel1(@Body() dto: CreateCategoriaNivel1Dto) {
    return this.categoriasService.createNivel1(dto);
  }

  @Get('nivel-1')
  findAllNivel1() {
    return this.categoriasService.findAllNivel1();
  }

  @Get('nivel-1/:id')
  findOneNivel1(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.findOneNivel1(id);
  }

  @Patch('nivel-1/:id')
  updateNivel1(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoriaDto) {
    return this.categoriasService.updateNivel1(id, dto);
  }

  @Delete('nivel-1/:id')
  removeNivel1(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.removeNivel1(id);
  }

  // RUTAS NIVEL 2
  @Post('nivel-2')
  createNivel2(@Body() dto: CreateCategoriaNivel2Dto) {
    return this.categoriasService.createNivel2(dto);
  }

  @Get('nivel-2')
  findAllNivel2() {
    return this.categoriasService.findAllNivel2();
  }

  @Get('nivel-2/:id')
  findOneNivel2(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.findOneNivel2(id);
  }

  @Patch('nivel-2/:id')
  updateNivel2(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoriaDto) {
    return this.categoriasService.updateNivel2(id, dto);
  }

  @Delete('nivel-2/:id')
  removeNivel2(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.removeNivel2(id);
  }
}