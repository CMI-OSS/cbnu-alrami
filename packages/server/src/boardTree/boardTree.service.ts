import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { BoardResponseDto } from "src/board/dto/board.response.dto";
import { BoardTree } from "src/commons/entities/boardTree.entity";
import { Errors } from "src/commons/exception/exception.global";

import { BoardTreeRepository } from "./boardTree.repository";
import { BoardTreeAllResponseDto } from "./dto/boardTree.all.response.dto";
import { BoardTreeResponseDto } from "./dto/boardTree.response.dto";

const { BOARD_ID_NOT_FOUND } = Errors;

@Injectable()
export class BoardTreeService {
  constructor(private readonly boardTreeRepository: BoardTreeRepository) {}

  async findByBoard(boardId: number): Promise<BoardTree> {
    const boardTree = await this.boardTreeRepository.findOne({
      where: {
        board: boardId,
      },
      relations: [ "board", "parentBoard" ],
    });

    return boardTree;
  }

  async getBoardTree(boardId: number): Promise<BoardTreeResponseDto> {
    const boardTree = await this.findByBoard(boardId);
    if (typeof boardTree === "undefined") return null;

    return Builder(BoardTreeResponseDto)
      .id(boardTree.board.id)
      .name(boardTree.board.name)
      .parent(
        Builder(BoardResponseDto)
          .id(boardTree.parentBoard.id)
          .name(boardTree.parentBoard.name)
          .build(),
      )
      .build();
  }

  async findAll() {
    const rootList: BoardTree[] = await this.boardTreeRepository.find({
      where: {
        parentBoard: null,
      },
      relations: [ "board", "parentBoard" ],
    });

    const response: BoardTreeAllResponseDto[] = [];

    await Promise.all(
      rootList.map(async (root) => {
        const children = await this.findChildren(root.board.id);
        response.push(
          Builder(BoardTreeAllResponseDto)
            .id(root.board.id)
            .name(root.board.name)
            .children(children)
            .build(),
        );
      }),
    );

    return response;
  }

  async findChildren(parentId: number): Promise<BoardTreeAllResponseDto[]> {
    const children = await this.boardTreeRepository.find({
      where: {
        parentBoard: parentId,
      },
      relations: [ "board", "parentBoard" ],
    });

    const response: BoardTreeAllResponseDto[] = [];

    await Promise.all(
      children.map(async (child) => {
        const grandChildren: BoardTreeAllResponseDto[] =
          children.length > 0
            ? await this.findChildren(child.board.id)
            : undefined;

        // 리프노드인 경우에만 url을 보낸다.
        if (grandChildren !== undefined) {
          response.push(
            Builder(BoardTreeAllResponseDto)
              .id(child.board.id)
              .name(child.board.name)
              .children(grandChildren)
              .build(),
          );
        } else {
          response.push(
            Builder(BoardTreeAllResponseDto)
              .id(child.board.id)
              .name(child.board.name)
              .url(child.board.url)
              .children(grandChildren)
              .build(),
          );
        }
      }),
    );

    return response.length === 0 ? undefined : response;
  }
}
