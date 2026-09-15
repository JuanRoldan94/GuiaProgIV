import { IsString, IsNotEmpty, IsInt, Min, Matches } from 'class-validator'

export class CreateDepositoDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^DEP-\d+/, {
        message: 'El codigo debe seguir el patrón "DEP-XX" (Ej.: DEP-1)'
    })
    codigo: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsInt()
    @Min(1)
    provinciaId: number;

    @IsInt()
    @Min(1)
    localidadId: number;
}
