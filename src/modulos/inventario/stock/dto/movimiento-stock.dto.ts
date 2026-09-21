import { IsInt, IsPositive, IsString, IsOptional } from 'class-validator'

export class MovimientoStockDto {
    @IsInt()
    @IsPositive()
    productoId: number;

    @IsInt()
    @IsPositive()
    depositoId: number;

    @IsInt()
    @IsPositive({ message: 'La cantidad debe ser mayor a cero' })
    cantidad: number;

    @IsString()
    @IsOptional()
    motivo?: string;
}