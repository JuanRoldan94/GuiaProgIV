import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateProveedoreDto } from './dto/create-proveedore.dto.js';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto.js';

@Injectable()
export class ProveedoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProveedorDto: CreateProveedoreDto) {
    return await this.prisma.proveedor.create({
      data: createProveedorDto,
    });
  }

  async findAll() {

    return await this.prisma.proveedor.findMany({
      where: { archivado: false },
    });
  }

  async findOne(id: number) {
    const registro = await this.prisma.proveedor.findFirst({
      where: { 
        id, 
        archivado: false 
      },
    });

    if (!registro) {
      throw new NotFoundException(`Registro con ID #${id} no encontrado`);
    }

    return registro;
  }

  async update(id: number, updateMarcaDto: UpdateProveedoreDto) {

    await this.findOne(id); 

    return await this.prisma.proveedor.update({
      where: { id },
      data: updateMarcaDto,
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    return await this.prisma.proveedor.update({
      where: { id },
      data: { archivado: true },
    });
  }
}