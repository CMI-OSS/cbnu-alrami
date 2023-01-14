import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { CafeteriaMenuService } from "./cafeteria-menu.service";
import { CreateCafeteriaMenuDto } from "./dto/create-cafeteria-menu.dto";

@Controller("cafeteria-menu")
export class CafeteriaMenuController {
  constructor(private readonly cafeteriaMenuService: CafeteriaMenuService) {}

  @Post()
  create(@Body() createCafeteriaMenuDto: CreateCafeteriaMenuDto) {
    return this.cafeteriaMenuService.create(createCafeteriaMenuDto);
  }

  @Get()
  findAll() {
    return this.cafeteriaMenuService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cafeteriaMenuService.findOne(+id);
  }
}
