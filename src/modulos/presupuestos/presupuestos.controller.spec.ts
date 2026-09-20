import { Test, TestingModule } from '@nestjs/testing';
import { PresupuestosController } from './presupuestos.controller.js';
import { PresupuestosService } from './presupuestos.service.js';

describe('PresupuestosController', () => {
  let controller: PresupuestosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresupuestosController],
      providers: [PresupuestosService],
    }).compile();

    controller = module.get<PresupuestosController>(PresupuestosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
