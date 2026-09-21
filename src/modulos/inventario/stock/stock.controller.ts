import { Controller, Post, Body } from '@nestjs/common';
import { StockService } from './stock.service.js';
import { MovimientoStockDto } from './dto/movimiento-stock.dto.js'; 
import { TransferirStockDto } from './dto/transferir-stock.dto.js';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('ingreso')
  registrarIngreso(@Body() dto: MovimientoStockDto) {
    return this.stockService.ingresarStock(dto);
  }

  @Post('egreso')
  registrarEgreso(@Body() dto: MovimientoStockDto) {
    return this.stockService.egresarStock(dto);
  }

  @Post('transferencia')
  transferirStock(@Body() dto: TransferirStockDto) {
    return this.stockService.transferirStock(dto);
  }
}