import { Controller } from '@nestjs/common';
import { StockService } from './stock.service.js';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}
}
