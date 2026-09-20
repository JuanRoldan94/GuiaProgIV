import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateCategoriaNivel1Dto } from './dto/create-categoria-nivel1-dto.js';
import { UpdateCategoriaDto } from './dto/update-categoria.dto.js';
import { CreateCategoriaNivel2Dto } from './dto/create-categoria-nivel2-dto.js';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  // JERARQUÍA 
  async obtenerJerarquia() {
    return await this.prisma.categoriaNivel1.findMany({
      where: { archivado: false },
      include: {
        categoriasNivel2: {
          where: { archivado: false },
          orderBy: { nombre: 'asc' },
        },
      },
      orderBy: { nombre: 'asc' },
    });
  }

  // CATEGORÍAS NIVEL 1
  async createNivel1(dto: CreateCategoriaNivel1Dto) {
    return await this.prisma.categoriaNivel1.create({ data: dto });
  }

  async findAllNivel1() {
    return await this.prisma.categoriaNivel1.findMany({
      where: { archivado: false },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOneNivel1(id: number) {
    const categoria = await this.prisma.categoriaNivel1.findFirst({
      where: { id, archivado: false },
    });
    if (!categoria) throw new NotFoundException(`Categoría Nivel 1 #${id} no encontrada`);
    return categoria;
  }

  async updateNivel1(id: number, dto: UpdateCategoriaDto) {
    await this.findOneNivel1(id);
    return await this.prisma.categoriaNivel1.update({
      where: { id },
      data: dto,
    });
  }

  async removeNivel1(id: number) {
    await this.findOneNivel1(id);
    return await this.prisma.categoriaNivel1.update({
      where: { id },
      data: { archivado: true },
    });
  }

  // CATEGORÍAS NIVEL 2
  async createNivel2(dto: CreateCategoriaNivel2Dto) {
    return await this.prisma.categoriaNivel2.create({ data: dto });
  }

  async findAllNivel2() {
    return await this.prisma.categoriaNivel2.findMany({
      where: { archivado: false },
      include: { categoriaNivel1: true }, 
      orderBy: { nombre: 'asc' },
    });
  }

  async findOneNivel2(id: number) {
    const categoria = await this.prisma.categoriaNivel2.findFirst({
      where: { id, archivado: false },
      include: { categoriaNivel1: true },
    });
    if (!categoria) throw new NotFoundException(`Categoría Nivel 2 #${id} no encontrada`);
    return categoria;
  }

  async updateNivel2(id: number, dto: UpdateCategoriaDto) {
    await this.findOneNivel2(id);
    return await this.prisma.categoriaNivel2.update({
      where: { id },
      data: dto,
    });
  }

  async removeNivel2(id: number) {
    await this.findOneNivel2(id);
    return await this.prisma.categoriaNivel2.update({
      where: { id },
      data: { archivado: true },
    });
  }
}