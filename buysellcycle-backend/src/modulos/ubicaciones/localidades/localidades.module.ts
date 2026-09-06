import { Module } from '@nestjs/common';
import { LocalidadesService } from './localidades.service.js';
import { LocalidadesController } from './localidades.controller.js';

@Module({
  controllers: [LocalidadesController],
  providers: [LocalidadesService],
})
export class LocalidadesModule {}
