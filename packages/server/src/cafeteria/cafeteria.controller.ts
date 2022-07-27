import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "src/commons/decorators/public.decorator";
import { Cafeteria } from "src/commons/entities/cafeteria.entity";

import { CafeteriaService } from "./cafeteria.service";
import { CafeteriaCreateDto } from "./dto/cafeteria.create.dto";
import { CafeteriaResponseDto } from "./dto/cafeteria.response.dto";

@Public()
@Controller("cafeterias")
export class CafeteriaController {
  constructor(private cafeteriaService: CafeteriaService) {}

  @Get()
  @ApiOperation({
    summary: "전체 식당 조회 API",
    description: "모든 Cafeteria를 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "전체 식당 리스트",
    type: Cafeteria,
  })
  async find(): Promise<Cafeteria[]> {
    return this.cafeteriaService.find();
  }

  @Get("/:id/menus")
  @ApiOperation({
    summary: "특정 식당 메뉴 API",
    description: "id를 이용, 특정 식당 메뉴(아침, 점심, 저녁) 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "id에 해당하는 cafteria 객체",
    type: Cafeteria,
  })
  async findCafeteriaMenus(
    @Param("id") id: number,
    @Query("date") date: string,
  ): Promise<CafeteriaResponseDto[]> {
    return this.cafeteriaService.findById(id, date);
  }

  @Post("/:cafeteriaId/menus")
  @ApiOperation({
    summary: "학생식당 메뉴추가 API",
    description: "CafeteriaCreateDto 생성되어 db 저장.",
  })
  @ApiResponse({
    status: 201,
    description: "id에 해당하는 cafteria_menu 객체",
    type: CafeteriaCreateDto,
  })
  async create(
    @Param("cafeteriaId") cafeteriaId: number,
    @Body() cafeteriaCreateDto: CafeteriaCreateDto,
  ) {
    const cafeteria = await this.cafeteriaService.create(
      cafeteriaId,
      cafeteriaCreateDto,
    );
  }
}
