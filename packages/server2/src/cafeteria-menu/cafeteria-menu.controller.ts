import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { SuperGuard } from "src/admin/gurads/super.guard";
import { MutationResponse } from "src/common/types/response";

import { CafeteriaName } from "./cafeteria-menu.constant";
import { CafeteriaMenuService } from "./cafeteria-menu.service";
import { CreateCafeteriaMenuDto } from "./dto/create-cafeteria-menu.dto";
import { CafeteriaMenu } from "./entities/cafeteria-menu.entity";

@ApiTags("[cafeteria-menu] 학생식당 API")
@Controller("cafeteria-menu")
export class CafeteriaMenuController {
  constructor(private readonly cafeteriaMenuService: CafeteriaMenuService) {}

  @SuperGuard()
  @Post()
  @ApiOperation({
    summary: "메뉴 등록",
  })
  @ApiCreatedResponse({
    description: "등록 성공 여부",
    type: MutationResponse,
  })
  async create(
    @Body() createCafeteriaMenuDto: CreateCafeteriaMenuDto,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.cafeteriaMenuService.create(
        createCafeteriaMenuDto,
      )),
    };
  }

  @Get(":name/:date")
  @ApiOperation({
    summary: "학생식당 일자별 메뉴 조회",
    parameters: [
      {
        name: "name",
        in: "path",
        schema: { type: "enum", enum: Object.values(CafeteriaName) },
      },
      { name: "date", in: "path", schema: { type: "string" } },
    ],
  })
  @ApiOkResponse({ type: () => CafeteriaMenu, isArray: true })
  findAll(@Param("name") name: CafeteriaName, @Param("date") date: string) {
    return this.cafeteriaMenuService.find(name, date);
  }
}
