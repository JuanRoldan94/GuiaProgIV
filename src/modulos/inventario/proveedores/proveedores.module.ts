import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service.js';
import { ProveedoresController } from './proveedores.controller.js';

@Module({
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedoresModule {}
