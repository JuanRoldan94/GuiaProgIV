import { IsString, IsNotEmpty, IsEmail, IsInt, Min } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsEmail({}, { message: 'El formato del mail no es valido'})
    email: string;

    @IsInt()
    @Min(1)
    provinciaId: number;

    @IsInt()
    @Min(1)
    localidadId: number;
}
