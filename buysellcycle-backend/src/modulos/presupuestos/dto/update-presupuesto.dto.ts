import { PartialType } from '@nestjs/mapped-types';
import { CreatePresupuestoDto } from './create-presupuesto.dto.js';

export class UpdatePresupuestoDto extends PartialType(CreatePresupuestoDto) {}
