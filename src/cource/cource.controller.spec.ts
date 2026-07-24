import { Test, TestingModule } from '@nestjs/testing';
import { CourceController } from './cource.controller';
import { CourceService } from './cource.service';
import { ClassService } from 'src/class/class.service';

describe('CourceController', () => {
  let controller: CourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourceController],
      providers: [
        CourceService,
        { provide: ClassService, useValue: { findAll: jest.fn() } },
      ],
    }).compile();

    controller = module.get<CourceController>(CourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
