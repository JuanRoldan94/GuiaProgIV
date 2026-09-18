import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    return await this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  async findAll() {
    return await this.prisma.cliente.findMany({
      where: { archivado: false },
    });
  }

  async findOne(id: number) {
    const registro = await this.prisma.cliente.findFirst({
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

  async update(id: number, updateClienteDto: UpdateClienteDto) {

    await this.findOne(id); 

    return await this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(id: number) {

    await this.findOne(id);


    return await this.prisma.cliente.update({
      where: { id },
      data: { archivado: true },
    });
  }
}
