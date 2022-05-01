import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { BoardService } from "src/board/board.service";
import { BoardResponseDto } from "src/board/dto/board.response.dto";
import { BoardResponseDtoBuilder } from "src/board/dto/board.response.dto.builder";
import { Board } from "src/commons/entities/board.entity";

import { BoardTreeRepository } from "./boardTree.repository";
import { BoardTreeResponseDto } from "./dto/boardTree.response.dto";
import { BoardTreeResponseDtoBuilder } from "./dto/boardTree.response.dto.builder";

@Injectable()
export class BoardTreeService {
  constructor(
    private readonly boardService: BoardService,
    private readonly boardTreeRepository: BoardTreeRepository,
  ) {}

  async findByBoard(board: Board): Promise<BoardTreeResponseDto> {
    const boardTree = await this.boardTreeRepository.findOne(
      { board },
      { relations: [ "board", "parentBoard" ] },
    );

    const parent = new BoardResponseDtoBuilder()
      .setId(boardTree.parentBoard.id)
      .setName(boardTree.parentBoard.name)
      .build();

    return new BoardTreeResponseDtoBuilder()
      .setId(boardTree.board.id)
      .setName(boardTree.board.name)
      .setParent(parent)
      .build();
  }
}
