import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";

import { BoardService } from "./board.service";

describe("BoardModule", () => {
  let boardService: BoardService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
  });

  test("create board seed", async () => {
    await boardService.create({
      id: 100,
      name: "테스트",
      url: "asfasf",
    });
  });
});
