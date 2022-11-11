import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArticleService } from "src/article/article.service";
import { PaginationDto } from "src/common/dto/pagination.dto";

import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@ApiTags("[board] 게시판 API")
@Controller("board")
export class BoardController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly boardService: BoardService,
  ) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.boardService.findOne(id);
  }

  @Get()
  find() {
    return this.boardService.findAll();
  }

  @Get(":id/articles")
  findArticlePage(@Param("id") id: number, @Query() query: PaginationDto) {
    return this.articleService.findArticlePage(id, query.page, query.count);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.boardService.remove(+id);
  }
}
