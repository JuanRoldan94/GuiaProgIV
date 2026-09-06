import { Controller } from '@nestjs/common';
import { LocalidadesService } from './localidades.service.js';

@Controller('localidades')
export class LocalidadesController {
  constructor(private readonly localidadesService: LocalidadesService) {}
}
