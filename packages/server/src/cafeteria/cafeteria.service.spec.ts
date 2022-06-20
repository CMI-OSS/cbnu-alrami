import { Test, TestingModule } from "@nestjs/testing";

import { CafeteriaService } from "./cafeteria.service";

describe("CafeteriaService", () => {
  let service: CafeteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ CafeteriaService ],
    }).compile();

    service = module.get<CafeteriaService>(CafeteriaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
