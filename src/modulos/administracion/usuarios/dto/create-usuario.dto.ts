import { RolUsuario } from '@prisma/client';
import { IsString, IsNotEmpty, IsInt, IsEnum, Min } from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @IsNotEmpty()
    dni: string;

    @IsString()
    @IsNotEmpty()
    nombreUsuario: string;

    @IsEnum(RolUsuario, {
        message: 'El rol debe ser Administracion o vendedor'
    })
    rol: RolUsuario;

    @IsInt()
    @Min(1)
    sucursalId: number;
}
