import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMarcaDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre de la marca es obligatorio '})
    nombre: string;
}
