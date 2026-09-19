import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js'
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';

@Injectable()
export class UsuariosService {
  constructor (private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this.prisma.usuario.create({
      data: createUsuarioDto,
    });
  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      where: { archivado: false},
      include: {
        sucursal: true,
      },
    });
  }

  async findOne(id: number) {
    const registro = await this.prisma.usuario.findFirst({
      where: {
        id,
        archivado: false
      },
      include: {
        sucursal: true,
      },
    });

    if (!registro) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado`);
    }
    
    return registro;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);

    return await this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.usuario.update({
      where: { id },
      data: { archivado: true },
    });
  }
}
