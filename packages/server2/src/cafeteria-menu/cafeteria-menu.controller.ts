import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { CafeteriaName } from "./cafeteria-menu.constant";
import { CafeteriaMenuService } from "./cafeteria-menu.service";
import { CreateCafeteriaMenuDto } from "./dto/create-cafeteria-menu.dto";

@ApiTags("[cafeteria-menu] 학생식당 API")
@Controller("cafeteria-menu")
export class CafeteriaMenuController {
  constructor(private readonly cafeteriaMenuService: CafeteriaMenuService) {}

  @Post()
  create(@Body() createCafeteriaMenuDto: CreateCafeteriaMenuDto) {
    return this.cafeteriaMenuService.create(createCafeteriaMenuDto);
  }

  @Get(":name/:date")
  @ApiOperation({
    parameters: [
      {
        name: "name",
        in: "path",
        schema: { enum: Object.values(CafeteriaName) },
      },
      { name: "date", in: "path", schema: { type: "string" } },
    ],
  })
  findAll(@Param("name") name: CafeteriaName, @Param("date") date: string) {
    return this.cafeteriaMenuService.find(name, date);
  }
}
