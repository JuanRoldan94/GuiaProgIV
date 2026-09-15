import { IsString, IsNotEmpty, Length } from 'class-validator';
export class CreateProveedoreDto {
    @IsString()
    @IsNotEmpty ({ message: 'La razon social es obligatoria'})
    razonSocial: string;

    @IsString()
    @IsNotEmpty()
    @Length(11, 11, {message: 'El cuit debe tener exactamente 11 caracteres'})
    cuit: string;
}
