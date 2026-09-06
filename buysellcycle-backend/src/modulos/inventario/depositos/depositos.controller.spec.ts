import { Test, TestingModule } from '@nestjs/testing';
import { DepositosController } from './depositos.controller.js';
import { DepositosService } from './depositos.service.js';

describe('DepositosController', () => {
  let controller: DepositosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositosController],
      providers: [DepositosService],
    }).compile();

    controller = module.get<DepositosController>(DepositosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
