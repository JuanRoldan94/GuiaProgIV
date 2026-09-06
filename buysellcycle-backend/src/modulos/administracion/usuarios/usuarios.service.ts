import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';

@Injectable()
export class UsuariosService {

  private usuariosArray: string[] = [];

  create(createUsuarioDto: CreateUsuarioDto) {
    this.usuariosArray.push(createUsuarioDto.nombre);
    return this.usuariosArray;
  }

  findAll() {
    return this.usuariosArray;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
