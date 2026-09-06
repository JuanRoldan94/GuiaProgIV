import { PartialType } from '@nestjs/mapped-types';
import { CreateSucursaleDto } from './create-sucursale.dto.js';

export class UpdateSucursaleDto extends PartialType(CreateSucursaleDto) {}
