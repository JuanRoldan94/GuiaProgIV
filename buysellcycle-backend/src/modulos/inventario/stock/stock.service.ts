import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { TransferirStockDto } from './dto/transferir-stock.dto.js';
import { MovimientoStockDto } from './dto/movimiento-stock.dto.js';

@Injectable()
export class StockService {
    constructor (private readonly prisma: PrismaService) {}

    async ingresarStock(dto: MovimientoStockDto) {
        const { productoId, depositoId, cantidad } = dto;

        return await this.prisma.$transaction(async (tx) => {
            const stockActual = await tx.stockProductoDeposito.findUnique({
                where: {
                    productoId_depositoId: { productoId, depositoId },
                },
            });

            if (stockActual) {
                await tx.stockProductoDeposito.update({
                    where: { id: stockActual.id },
                    data: { stock: stockActual.stock + cantidad },
                });
            }else {
                await tx.stockProductoDeposito.create({
                    data: { productoId, depositoId, stock: cantidad},
                });
            }

            const todosLosStocks = await tx.stockProductoDeposito.findMany({
                where: { productoId, archivado: false},
            });

            const stockTotalAcumulado = todosLosStocks.reduce((acc, curr) => acc + curr.stock, 0);

            await tx.producto.update({
                where: { id: productoId },
                data: {
                    stockTotal: stockTotalAcumulado,
                    fechaUltimoMovimiento: new Date(),
                    fechaUltimaSincronizacion: new Date(),
                },
            });

            return { success: true, message: `Se ingresaron ${cantidad} unidades correctamente`}
        });
    }

    async egresarStock(dto: MovimientoStockDto){
        const { productoId, depositoId, cantidad } = dto;
        
        return await this.prisma.$transaction(async (tx) => {
            const stockActual = await tx.stockProductoDeposito.findUnique({
                where: {
                    productoId_depositoId: { productoId, depositoId },
                },
            });

            if (!stockActual || stockActual.stock < cantidad) {
                throw new BadRequestException('Stock insuficiente para realizar el egreso en este deposito');
            }

            await tx.stockProductoDeposito.update({
                where: { id: stockActual.id },
                data: { stock: stockActual.stock - cantidad},
            });

            const todosLosStocks = await tx.stockProductoDeposito.findMany({
                where: { productoId, archivado: false},
            });

            const stockTotalAcumulado = todosLosStocks.reduce((acc, curr) => acc + curr.stock, 0 );

            await tx.producto.update({
                where: { id: productoId },
                data: {
                    stocklTotal: stockTotalAcumulado,
                    fechaUltimoMovimiento: new Date(),
                    fechaUltimaSincronizacion: new Date(),
                },
            });

            return { success: true, message: `Se entregaron ${cantidad} unidades correctamente`};
        });
    }

    async transferirStock(dto: TransferirStockDto) {
        const { productoId, depositoOrigenId, depositoDestinoId, cantidad } = dto;

        if(depositoOrigenId === depositoDestinoId) {
            throw new BadRequestException('El deposito de origen y destino no pueden ser el mismo');
        }

        return await this.prisma.$transaction(async (tx) => {
            const stockOrigen = await tx.stockProductoDeposito.findUnique({
                where: {
                    productoId_depositoId: { 
                        productoId, depositoId: depositoOrigenId 
                    },
                },
            });

            if (!stockOrigen || stockOrigen.stock < cantidad) {
                throw new BadRequestException('Stock insuficiente en el deposito de origen');
            }

            await tx.stockProductoDeposito.update({
                where: { id: stockOrigen.id },
                data: { stock: stockOrigen.stock - cantidad},
            });

            const stockDestino = await tx.stockProductoDeposito.findUnique({
                where: {
                    productoId_depositoId: {
                        productoId,
                        depositoId: depositoDestinoId,
                    },
                },
            });

            if(stockDestino) {
                await tx.stockProductoDeposito.update({
                    where: { id: stockDestino.id },
                    data: { stock: stockDestino.stock + cantidad },
                });
            } else {
                await tx.stockProductoDeposito.create({
                    data: {
                        productoId,
                        depositoId: depositoDestinoId,
                        stock: cantidad,
                    },
                });
            }

            await tx.producto.update({
                where: { id: productoId },
                data: {
                    fechaUltimoMovimiento: new Date(),
                },
            });

            return {
                success: true,
                message: `Se transfirieron ${cantidad} unidades correctamente`
            };
        });
    }
}