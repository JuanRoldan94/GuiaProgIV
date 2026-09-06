import { Test, TestingModule } from '@nestjs/testing';
import { MarcasController } from './marcas.controller.js';
import { MarcasService } from './marcas.service.js';

describe('MarcasController', () => {
  let controller: MarcasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarcasController],
      providers: [MarcasService],
    }).compile();

    controller = module.get<MarcasController>(MarcasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
