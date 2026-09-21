import { IsInt, IsPositive, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PresupuestoItemDto {
    @IsInt()
    @IsPositive()
    productoId: number;

    @IsInt()
    @IsPositive()
    cantidad: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    precioUnitario: number;
}

export class CreatePresupuestoDto {
    @IsInt()
    @IsPositive()
    clienteId: number;

    @IsInt()
    @IsPositive()
    sucursalId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PresupuestoItemDto)
    items: PresupuestoItemDto[];
}
