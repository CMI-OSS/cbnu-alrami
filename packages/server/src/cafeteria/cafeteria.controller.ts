import { Controller, Get, Param, Query } from "@nestjs/common";
import { Public } from "src/commons/decorators/public.decorator";
import { Cafeteria } from "src/commons/entities/cafeteria.entity";

import { CafeteriaService } from "./cafeteria.service";
import { CafeteriaResponseDto } from "./dto/cafeteria.response.dto";

@Public()
@Controller("cafeterias")
export class CafeteriaController {
  constructor(private cafeteriaService: CafeteriaService) {}

  @Get()
  async find(): Promise<Cafeteria[]> {
    return this.cafeteriaService.find();
  }

  @Get("/:id/menus")
  async findCafeteriaMenus(
    @Param("id") id: number,
    @Query("date") date: string,
  ): Promise<CafeteriaResponseDto[]> {
    return this.cafeteriaService.findById(id, date);
  }
}
