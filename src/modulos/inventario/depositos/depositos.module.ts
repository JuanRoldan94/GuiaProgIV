import { Module } from '@nestjs/common';
import { DepositosService } from './depositos.service.js';
import { DepositosController } from './depositos.controller.js';

@Module({
  controllers: [DepositosController],
  providers: [DepositosService],
})
export class DepositosModule {}
