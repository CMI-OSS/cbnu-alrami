import { Test, TestingModule } from "@nestjs/testing";

import { CafeteriaMenuController } from "./cafeteria-menu.controller";

describe("CafeteriaMenuController", () => {
  let controller: CafeteriaMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ CafeteriaMenuController ],
    }).compile();

    controller = module.get<CafeteriaMenuController>(CafeteriaMenuController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
