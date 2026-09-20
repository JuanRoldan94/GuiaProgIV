import { IsInt, IsPositive, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PresupuestoItemDto {
    @IsInt()
    @IsPositive()
    productoId: number;

    @IsInt()
    @IsPositive()
    cantidad: number;
}

export class CreatePresupuestoDto {
    @IsInt()
    @IsPositive()
    clienteId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PresupuestoItemDto)
    items: PresupuestoItemDto[];
}
