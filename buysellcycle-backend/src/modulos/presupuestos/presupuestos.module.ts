import { Module } from '@nestjs/common';
import { PresupuestosService } from './presupuestos.service.js';
import { PresupuestosController } from './presupuestos.controller.js';

@Module({
  controllers: [PresupuestosController],
  providers: [PresupuestosService],
})
export class PresupuestosModule {}
