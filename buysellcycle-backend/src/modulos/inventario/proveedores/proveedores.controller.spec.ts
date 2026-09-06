import { Test, TestingModule } from '@nestjs/testing';
import { ProveedoresController } from './proveedores.controller.js';
import { ProveedoresService } from './proveedores.service.js';

describe('ProveedoresController', () => {
  let controller: ProveedoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProveedoresController],
      providers: [ProveedoresService],
    }).compile();

    controller = module.get<ProveedoresController>(ProveedoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
