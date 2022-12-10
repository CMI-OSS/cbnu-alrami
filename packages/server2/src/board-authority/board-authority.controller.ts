import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BoardAuthorityService } from "./board-authority.service";
import { CreateBoardAuthorityDto } from "./dto/create-board-authority.dto";
import { UpdateBoardAuthorityDto } from "./dto/update-board-authority.dto";

@ApiTags("[admin] 관리자 API")
@Controller("board-authority")
export class BoardAuthorityController {
  constructor(private readonly boardAuthorityService: BoardAuthorityService) {}

  @Post()
  create(@Body() createBoardAuthorityDto: CreateBoardAuthorityDto) {
    return this.boardAuthorityService.create(createBoardAuthorityDto);
  }

  @Get()
  findAll() {
    return this.boardAuthorityService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.boardAuthorityService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBoardAuthorityDto: UpdateBoardAuthorityDto,
  ) {
    return this.boardAuthorityService.update(+id, updateBoardAuthorityDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.boardAuthorityService.remove(+id);
  }
}
