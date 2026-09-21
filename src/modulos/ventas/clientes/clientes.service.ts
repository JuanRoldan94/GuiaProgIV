import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    const clienteExistenteDni = await this.prisma.cliente.findUnique({
      where: { dni: createClienteDto.dni},
    });

    if (clienteExistenteDni) {
      throw new BadRequestException(`Ya existe un cliente con el DNI/Cuit ${createClienteDto.dni}`);
    }

    const clienteExistenteEmail = await this.prisma.cliente.findUnique({
      where: { email: createClienteDto.email },
    });

    if (clienteExistenteEmail) {
      throw new BadRequestException(`El email ${createClienteDto.email} esta asignado a otro cliente`);
    }

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
