import { Test, TestingModule } from '@nestjs/testing';
import { LocalidadesController } from './localidades.controller.js';
import { LocalidadesService } from './localidades.service.js';

describe('LocalidadesController', () => {
  let controller: LocalidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalidadesController],
      providers: [LocalidadesService],
    }).compile();

    controller = module.get<LocalidadesController>(LocalidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
