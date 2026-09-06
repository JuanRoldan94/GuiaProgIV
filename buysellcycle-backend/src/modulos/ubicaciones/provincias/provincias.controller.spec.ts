import { Test, TestingModule } from '@nestjs/testing';
import { ProvinciasController } from './provincias.controller.js';
import { ProvinciasService } from './provincias.service.js';

describe('ProvinciasController', () => {
  let controller: ProvinciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvinciasController],
      providers: [ProvinciasService],
    }).compile();

    controller = module.get<ProvinciasController>(ProvinciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
