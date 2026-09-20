import { IsString, IsNotEmpty } from 'class-validator'

export class CreateCategoriaNivel1Dto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre de la categoria es obligatorio' })
    nombre: string;
}