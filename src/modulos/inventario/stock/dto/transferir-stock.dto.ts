import { IsInt, Min, IsPositive, IsString, IsOptional } from 'class-validator';

export class TransferirStockDto {
    @IsInt()
    @IsPositive()
    productoId: number;

    @IsInt()
    @IsPositive()
    depositoOrigenId: number;

    @IsInt()
    @IsPositive()
    depositoDestinoId: number;

    @IsInt()
    @Min(1, { message: 'Se debe transferir almenos una unidad'})
    cantidad: number;

    @IsString()
    @IsOptional()
    motivo: string;
}