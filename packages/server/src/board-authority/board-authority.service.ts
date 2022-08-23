import { Injectable } from "@nestjs/common";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { BoardAuthority } from "src/commons/entities/boardAuthority.entity";

import { BoardAuthorityRepository } from "./board-authoirty.repository";

@Injectable()
export class BoardAuthorityService {
  constructor(
    private readonly boardAuthorityRepository: BoardAuthorityRepository,
    private readonly boardTreeService: BoardTreeService,
  ) {}

  async findAll(adminId: number): Promise<BoardTreeResponseDto[]> {
    const boardsWithAuthority: BoardAuthority[] =
      await this.boardAuthorityRepository.find({
        where: {
          admin: {
            id: adminId,
          },
        },
        relations: [ "board" ],
      });

    return Promise.all(
      boardsWithAuthority.map(async ({ board }) => {
        const boardTree = await this.boardTreeService.getBoardTree(board.id);
        return boardTree;
      }),
    );
  }
}
