import { PartialType } from '@nestjs/mapped-types'; // O de '@nestjs/swagger' si usás Swagger
import { CreateCategoriaNivel1Dto } from './create-categoria-nivel1-dto.js';

// 👇 Esta línea hace la magia. Hereda todo de Create y lo hace opcional.
export class UpdateCategoriaNivel1Dto extends PartialType(CreateCategoriaNivel1Dto) {}