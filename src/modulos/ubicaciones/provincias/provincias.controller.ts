import { Controller } from '@nestjs/common';
import { ProvinciasService } from './provincias.service.js';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provinciasService: ProvinciasService) {}
}
