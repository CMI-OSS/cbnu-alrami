import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminService } from "src/admin/admin.service";
import { BoardService } from "src/board/board.service";
import { Repository } from "typeorm";

import { CreateBoardAuthorityDto } from "./dto/create-board-authority.dto";
import { UpdateBoardAuthorityDto } from "./dto/update-board-authority.dto";
import { BoardAuthority } from "./entities/board-authority.entity";

@Injectable()
export class BoardAuthorityService {
  constructor(
    @InjectRepository(BoardAuthority)
    private boardAuthorityRepository: Repository<BoardAuthority>,
    private adminService: AdminService,
    private boardService: BoardService,
  ) {}

  async create({ adminId, authority, boardId }: CreateBoardAuthorityDto) {
    const admin = await this.adminService.findOne(adminId);
    const board = await this.boardService.findOne(boardId);

    const boardAuthority = await this.boardAuthorityRepository.create({
      admin,
      board,
      authority,
    });

    return this.boardAuthorityRepository.save(boardAuthority);
  }

  findAll() {
    return `This action returns all boardAuthority`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boardAuthority`;
  }

  update(id: number, updateBoardAuthorityDto: UpdateBoardAuthorityDto) {
    return `This action updates a #${id} boardAuthority`;
  }

  remove(id: number) {
    return `This action removes a #${id} boardAuthority`;
  }
}
