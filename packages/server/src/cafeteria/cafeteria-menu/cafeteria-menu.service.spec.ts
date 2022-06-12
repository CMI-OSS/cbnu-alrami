import { Test, TestingModule } from '@nestjs/testing';
import { CafeteriaMenuService } from './cafeteria-menu.service';

describe('CafeteriaMenuService', () => {
  let service: CafeteriaMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CafeteriaMenuService],
    }).compile();

    service = module.get<CafeteriaMenuService>(CafeteriaMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
