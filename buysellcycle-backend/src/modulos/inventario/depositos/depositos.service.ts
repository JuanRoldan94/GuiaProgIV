import { Injectable } from '@nestjs/common';
import { UpdateDepositoDto } from './dto/update-deposito.dto.js';
import { PrismaService } from '../../../../prisma/prisma.service.js'

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

  findAll() {
    return `This action returns all depositos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deposito`;
  }

  update(id: number, updateDepositoDto: UpdateDepositoDto) {
    return `This action updates a #${id} deposito`;
  }

  remove(id: number) {
    return `This action removes a #${id} deposito`;
  }
}
