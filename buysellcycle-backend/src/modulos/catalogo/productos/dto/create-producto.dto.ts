import { IsString, IsNotEmpty, IsNumber, IsOptional, IsInt, Min } from 'class-validator';

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNumber({ maxDecimalPlaces:2 })
    @Min(0)
    costoNeto: number;

    @IsNumber({ maxDecimalPlaces:2 })
    @Min(0)
    porcentajeDescuentoContado: number;

    @IsOptional()
    @IsString()
    rutaImagenStorage?: string;

    @IsInt()
    @Min(1)
    marcaId: number;

    @IsInt()
    @Min(1)
    categoriaNivel2Id: number;
}
