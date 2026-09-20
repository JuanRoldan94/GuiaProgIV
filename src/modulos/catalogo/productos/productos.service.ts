import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { UpdateProductoDto } from './dto/update-producto.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js'
import { Decimal } from 'decimal.js';

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

    const costo = new Decimal(costoNeto);
    const utilidad = new Decimal(utilidadPorcentaje);
    const descuento = new Decimal(porcentajeDescuentoContado);

    const multiplicadorUtilidad = utilidad.dividedBy(100).plus(1);
    const precioLista = costo.times(multiplicadorUtilidad);

    const multiplicadorDescuento = new Decimal(1).minus(descuento.dividedBy(100));
    const precioContado = precioLista.times(multiplicadorDescuento);

    return await this.prisma.producto.create({
      data: {
        ...restData,
        costoNeto: costo.toDecimalPlaces(2).toNumber(),
        utilidadPorcentaje: utilidad.toDecimalPlaces(2).toNumber(),
        porcentajeDescuentoContado: descuento.toDecimalPlaces(2).toNumber(),
        precioLista: precioLista.toDecimalPlaces(2).toNumber(),
        precioContado: precioContado.toDecimalPlaces(2).toNumber(),
      },
    });
  }

  async findAll() {
    return await this.prisma.producto.findMany({
      where: {
        archivado: false,
      },
      include:{
        marca: true,
        categoriaNivel2: true,
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.producto.findFirst({
      where: {
        id,
        archivado: false,
      },
    });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const productoActual = await this.prisma.producto.findUnique({
      where: {id},
    });

    if (!productoActual || productoActual.archivado) {
      throw new NotFoundException('Producto no encontrado');
    }

    const costoNetoBase = updateProductoDto.costoNeto ?? productoActual.costoNeto;
    const utilidadBase = updateProductoDto.utilidadPorcentaje ?? productoActual.utilidadPorcentaje;
    const descuentoBase = updateProductoDto.porcentajeDescuentoContado ?? productoActual.porcentajeDescuentoContado;

    const costo = new Decimal(costoNetoBase as number);
    const utilidad = new Decimal(utilidadBase as number);
    const descuento = new Decimal(descuentoBase as number);

    const multiplicadorUtilidad = utilidad.dividedBy(100).plus(1);
    const precioLista = costo.times(multiplicadorUtilidad);
    
    const multiplicadorDescuento = new Decimal(1).minus(descuento.dividedBy(100));
    const precioContado = precioLista.times(multiplicadorDescuento);

    return await this.prisma.producto.update({
      where: { id },
      data: {
        ...updateProductoDto,
        costoNeto: costo.toDecimalPlaces(2).toNumber(),
        utilidadPorcentaje: utilidad.toDecimalPlaces(2).toNumber(),
        porcentajeDescuentoContado: descuento.toDecimalPlaces(2).toNumber(),
        precioLista: precioLista.toDecimalPlaces(2).toNumber(),
        precioContado: precioContado.toDecimalPlaces(2).toNumber(),
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.producto.update({
      where: { id },
      data: {
        archivado: true,
      },
    });
  }

  async sincronizarStockTotal(productoId: number) {
    const stocksEnDepositos = await this.prisma.stockProductoDeposito.findMany({
      where: {
        productoId: productoId,
        archivado: false,
      },
    });

    const stockAcumulado = stocksEnDepositos.reduce((acumulador, registroActual) => {
      return acumulador + registroActual.stock;
    }, 0);

    const productoActualizado = await this.prisma.producto.update({
      where: { id: productoId},
      data: {
        stockTotal: stockAcumulado,
        fechaUltimaSincronizacion: new Date(),
      },
    });

    return productoActualizado;
  }
}
