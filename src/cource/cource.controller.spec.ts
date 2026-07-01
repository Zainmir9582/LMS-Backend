import { Test, TestingModule } from '@nestjs/testing';
import { CourceController } from './cource.controller';
import { CourceService } from './cource.service';

describe('CourceController', () => {
  let controller: CourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourceController],
      providers: [CourceService],
    }).compile();

    controller = module.get<CourceController>(CourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
