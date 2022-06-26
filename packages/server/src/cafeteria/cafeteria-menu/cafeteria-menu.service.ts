import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CafeteriaService } from "src/cafeteria/cafeteria.service";
import { Cafeteria } from "src/commons/entities/cafeteria.entity";
import { CafeteriaMenu } from "src/commons/entities/cafeteriaMenu.entity";
import { errors } from "src/commons/error";
import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
} from "typeorm";

import { CafeteriaMenuCreateDto } from "./dto/cafeteriaMenuCreate.dto";
import { CafeteriaMenuRepository } from "./repository/cafeteriaMenu.repository";

const { MENU_NOT_FOUND, DB_ERROR } = errors;
@Injectable()
export class CafeteriaMenuService {
  constructor(
    @InjectRepository(CafeteriaMenuRepository)
    private cafeteriaMenuRepository: CafeteriaMenuRepository,
    private cafeteriaService: CafeteriaService,
  ) { }

  async findOne(query: FindOneOptions<CafeteriaMenu>): Promise<CafeteriaMenu> {
    const res = await this.cafeteriaMenuRepository.findOne(query);
    if (!res) throw MENU_NOT_FOUND;
    return res;
  }

  async find(query: FindManyOptions<CafeteriaMenu>): Promise<CafeteriaMenu[]> {
    const res = await this.cafeteriaMenuRepository.find(query);
    return res;
  }

  async delete(query: FindConditions<CafeteriaMenu>): Promise<DeleteResult> {
    const res = await this.cafeteriaMenuRepository.delete(query);
    if (!res.raw) throw MENU_NOT_FOUND;
    return res;
  }

  async create(cafeteriaMenu: CafeteriaMenuCreateDto): Promise<CafeteriaMenu> {
    const cafeteria: Cafeteria = await this.cafeteriaService.findOne({ where: { id: cafeteriaMenu.cafeteria } });
    const menu = this.cafeteriaMenuRepository.create({...cafeteriaMenu , cafeteria});
    if (!menu) throw DB_ERROR;
    return menu;
  }
}