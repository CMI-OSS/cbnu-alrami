import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { PageQuery } from "src/commons/decorators/PageQuery.decorator";
import { CafeteriaMenu } from "src/commons/entities/cafeteriaMenu.entity";
import { FindManyOptions } from "typeorm";

import { CafeteriaMenuService } from "./cafeteria-menu.service";
import { CafeteriaMenuCreateDto } from "./dto/cafeteriaMenuCreate.dto";

@Controller()
export class CafeteriaMenuController {
  constructor(private cafeteriaMenuService: CafeteriaMenuService) {}

  @Post(":cafeteriaId")
  async create(
    @Param("cafeteriaId") cafeteriaId: number,
    @Body() cafeteriaMenuCreateDto: CafeteriaMenuCreateDto,
  ): Promise<CafeteriaMenu> {
    const menu = await this.cafeteriaMenuService.create({
      cafeteria: cafeteriaId,
      ...cafeteriaMenuCreateDto,
    });
    return menu;
  }

  @Get()
  async find(
    @PageQuery() query: FindManyOptions<CafeteriaMenu>,
  ): Promise<CafeteriaMenu[]> {
    return this.cafeteriaMenuService.find(query);
  }
}
