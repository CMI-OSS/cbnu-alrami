import { Injectable } from "@nestjs/common";

import { CreateBoardAuthorityDto } from "./dto/create-board-authority.dto";
import { UpdateBoardAuthorityDto } from "./dto/update-board-authority.dto";

@Injectable()
export class BoardAuthorityService {
  create(createBoardAuthorityDto: CreateBoardAuthorityDto) {
    return "This action adds a new boardAuthority";
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
