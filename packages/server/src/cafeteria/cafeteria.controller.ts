import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CafeteriaService } from "./cafeteria.service";
import { CafeteriaCreateDto } from "./dto/cafeteria.create.dto";
import { CafeteriaResponseDto } from "./dto/cafeteria.response.dto";

@ApiTags("[cafeteria] 학생식당 도메인 API")
@Controller("cafeterias")
export class CafeteriaController {
  constructor(private cafeteriaService: CafeteriaService) {}

  @Get(":cafeteriaId/menus")
  @ApiOperation({
    summary: "특정 식당 메뉴 조회 API",
    description: "id를 이용, 특정 식당 메뉴(아침, 점심, 저녁) 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "해당하는 학생식당 메뉴 객체를 출력합니다.",
    type: CafeteriaResponseDto,
    isArray: true,
  })
  async findCafeteriaMenus(
    @Param("cafeteriaId") cafeteriaId: number,
    @Query("date") date: string,
  ): Promise<CafeteriaResponseDto[]> {
    return this.cafeteriaService.findByIdAndDate(cafeteriaId, date);
  }

  @Post("/:cafeteriaId/menus")
  @ApiOperation({
    summary: "학생식당 메뉴 추가 API",
    description: "학생식당 메뉴를 추가합니다.",
  })
  @ApiResponse({
    status: 201,
    description: "해당하는 학생 식당 메뉴를 추가합니다",
  })
  async create(
    @Param("cafeteriaId") cafeteriaId: number,
    @Body() cafeteriaCreateDto: CafeteriaCreateDto,
  ): Promise<void> {
    await this.cafeteriaService.create(cafeteriaId, cafeteriaCreateDto);
  }
}
