/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Test } from "@nestjs/testing";
import { boardTree } from "@shared/board-tree/board-tree.generated";
import { AppModule } from "src/app.module";

import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";

jest.setTimeout(600000);

const toBoardTreeMock = (board, name?, parentBoard?): CreateBoardDto[] => {
  const keys = Object.keys(board);

  return [
    name && {
      id: board.id,
      name,
      parentBoardId: parentBoard.id,
    },
    ...keys
      .filter((key) => {
        return key !== "id";
      })
      .map((key) => {
        return toBoardTreeMock(board[key], key, board);
      }),
  ]
    .filter(Boolean)
    .flat();
};

describe.skip("BoardModule", () => {
  let boardService: BoardService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
  });

  test("create board seed", async () => {
    const boards = toBoardTreeMock(boardTree);

    for (const board of boards) {
      await boardService.create(board);
    }
  });
});
