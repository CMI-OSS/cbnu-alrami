import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { AdminService } from "src/admin/admin.service";
import { BoardService } from "src/board/board.service";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { BoardAuthorityRole } from "src/commons/constants/enums";
import { BoardAuthority } from "src/commons/entities/boardAuthority.entity";

import { BoardAuthorityRepository } from "./board-authoirty.repository";

@Injectable()
export class BoardAuthorityService {
  constructor(
    private readonly adminService: AdminService,
    private readonly boardAuthorityRepository: BoardAuthorityRepository,
    private readonly boardTreeService: BoardTreeService,
    private readonly boardService: BoardService,
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

  async create(adminId: number, boardId: number) {
    const admin = await this.adminService.findOne({ where: { id: adminId } });
    const board = await this.boardService.findById(boardId);
    const boardAuthority = Builder(BoardAuthority)
      .admin(admin)
      .board(board)
      .build();
    boardAuthority.role = BoardAuthorityRole.WRITE;

    await this.boardAuthorityRepository.save(boardAuthority);
  }

  async remove(adminId: number, boardId: number) {
    const admin = await this.adminService.findOne({ where: { id: adminId } });
    const board = await this.boardService.findById(boardId);
    const boardAuthority = Builder(BoardAuthority)
      .admin(admin)
      .board(board)
      .build();

    await this.boardAuthorityRepository.delete(boardAuthority);
  }
}
