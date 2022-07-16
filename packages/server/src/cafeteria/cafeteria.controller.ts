/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Query } from "@nestjs/common";
import { PageQuery } from "src/commons/decorators/PageQuery.decorator";
import { Cafeteria } from "src/commons/entities/cafeteria.entity";
import { FindManyOptions, FindOneOptions } from "typeorm";

import { CafeteriaService } from "./cafeteria.service";

@Controller()
export class CafeteriaController {
  constructor(private cafeteriaService: CafeteriaService) {}

  @Get()
  async find(
    @PageQuery() query: FindManyOptions<Cafeteria>,
  ): Promise<Cafeteria[]> {
    return this.cafeteriaService.find(query);
  }
}
