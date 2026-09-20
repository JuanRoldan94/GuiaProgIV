import { Module } from '@nestjs/common';
import { ProvinciasService } from './provincias.service.js';
import { ProvinciasController } from './provincias.controller.js';

@Module({
  controllers: [ProvinciasController],
  providers: [ProvinciasService],
})
export class ProvinciasModule {}
