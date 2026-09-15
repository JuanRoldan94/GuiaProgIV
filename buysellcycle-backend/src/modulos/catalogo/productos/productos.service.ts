import { Injectable } from '@nestjs/common';
import { UpdateProductoDto } from './dto/update-producto.dto.js';
import { PrismaService } from '../../../../prisma/prisma.service.js'

@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductoDto: any) {
    const {
      costoNeto,
      utilidadPorcentaje,
      porcentajeDescuentoContado,
      ...restData
    } = createProductoDto;

    const precioLista = costoNeto * (1 + (utilidadPorcentaje / 100));

    const precioContado = precioLista * (1 - (porcentajeDescuentoContado / 100));

    return await this.prisma.producto.create({
      data: {
        ...restData,
        costoNeto,
        utilidadPorcentaje,
        porcentajeDescuentoContado,
        precioLista,
        precioContado,
      },
    });
  }

  findAll() {
    return `This action returns all productos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
