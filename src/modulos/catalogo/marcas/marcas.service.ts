import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js'
import { CreateMarcaDto } from './dto/create-marca.dto.js';
import { UpdateMarcaDto } from './dto/update-marca.dto.js';

@Injectable()
export class MarcasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMarcaDto: CreateMarcaDto) {
    return await this.prisma.marca.create({
      data: createMarcaDto,
    });
  }

  async findAll() {
    return await this.prisma.marca.findMany({
      where: { archivado: false },
    });
  }

  async findOne(id: number) {
    const registro = await this.prisma.marca.findFirst({
      where: {
        id: id,
        archivado:false
      },
    });

    if(!registro){
      throw new NotFoundException(`Registro con id #${id} no encontrado`);
    }
    return registro
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    await this.findOne(id);

    return await this.prisma.marca.update({
      where: { id },
      data: updateMarcaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.marca.update({
      where: { id },
      data: { archivado: true},
    })
  }
}
