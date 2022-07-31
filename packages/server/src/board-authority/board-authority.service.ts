import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { BoardAuthority } from "src/commons/entities/boardAuthority.entity";

import { BoardAuthorityRepository } from "./board-authoirty.repository";
import { BoardAuthorityResponseDto } from "./dto/board-authority.response.dto";

@Injectable()
export class BoardAuthorityService {
  constructor(
    private readonly boardAuthorityRepository: BoardAuthorityRepository,
  ) {}

  async findAll(adminId: number): Promise<BoardAuthorityResponseDto[]> {
    const boardsWithAuthority: BoardAuthority[] =
      await this.boardAuthorityRepository.find({
        where: {
          admin: {
            id: adminId,
          },
        },
        relations: [ "board" ],
      });

    return boardsWithAuthority.map(({ board }) =>
      Builder(BoardAuthorityResponseDto).id(board.id).name(board.name).build(),
    );
  }
}
