import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js'
import { CreateSucursaleDto } from './dto/create-sucursale.dto.js';
import { UpdateSucursaleDto } from './dto/update-sucursale.dto.js';

@Injectable()
export class SucursalesService {
  constructor (private readonly prisma: PrismaService) {}

  async create(createSucursaleDto: CreateSucursaleDto) {
    return await this.prisma.sucursal.create({
      data: createSucursaleDto,
    });
  }

  async findAll() {
    return await this.prisma.sucursal.findMany({
      where: { archivado: false },
      include: {
        provincia: true,
        localidad: true,
      },
    });
  }

  async findOne(id: number) {
    const registro = await this.prisma.sucursal.findFirst({
      where: {
        id, 
        archivado: false
      },
      include: {
        provincia: true,
        localidad: true,
      },
    });

    if(!registro) {
      throw new NotFoundException(`Sucursal con id #${id} no encontrada`);
    }

    return registro;
  }

  async update(id: number, updateSucursaleDto: UpdateSucursaleDto) {
    await this.findOne(id);

    return await this.prisma.sucursal.update({
      where: { id },
      data: updateSucursaleDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.sucursal.update({
      where: { id },
      data: { archivado: true },
    });
  }
}
