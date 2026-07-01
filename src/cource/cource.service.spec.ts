import { Test, TestingModule } from '@nestjs/testing';
import { CourceService } from './cource.service';

describe('CourceService', () => {
  let service: CourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourceService],
    }).compile();

    service = module.get<CourceService>(CourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
