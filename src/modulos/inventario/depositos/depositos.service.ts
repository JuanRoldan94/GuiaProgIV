import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepositoDto } from './dto/create-deposito.dto.js';
import { UpdateDepositoDto } from './dto/update-deposito.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js'
import { NotFoundError } from 'rxjs';

@Injectable()
export class DepositosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDepositoDto: any) {

    const ultimoDeposito = await this.prisma.deposito.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    let proximoNumero = 1;

    if (ultimoDeposito && ultimoDeposito.codigo.startsWith('DEP-')){
      const numeroAnterior = parseInt(ultimoDeposito.codigo.split('-')[1], 10);

      if (!isNaN(numeroAnterior)){
        proximoNumero = numeroAnterior + 1;
      }
    }

    const nuevoCodigo = `DEP-${proximoNumero.toString().padStart(2, '0')}`;

    return await this.prisma.deposito.create({
      data:{
        ...createDepositoDto,
        codigo: nuevoCodigo,
      },
    });
  }

  async findAll() {
    return await this.prisma.deposito.findMany({
      where: {
        archivado: false,
      },
      include:{
        provincia: true,
        localidad: true,
      }
    });
  }

  async findOne(id: number) {
    const deposito = await this.prisma.deposito.findFirst({
      where: {
        id,
        archivado: false,
      },
      include: {
        provincia: true,
        localidad: true,
      }
    });

    if (!deposito){
      throw new NotFoundException('Deposito no encontrado');
    }

    return deposito;
  }

  async update(id: number, updateDepositoDto: UpdateDepositoDto) {
    await this.findOne(id);

    return await this.prisma.deposito.update({
      where: { id },
      data: updateDepositoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.deposito.update({
      where: { id },
      data: {
        archivado: true,
      },
    });
  }
}
