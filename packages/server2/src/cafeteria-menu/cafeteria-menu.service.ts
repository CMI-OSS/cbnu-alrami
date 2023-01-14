import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCafeteriaMenuDto } from "./dto/create-cafeteria-menu.dto";
import { CafeteriaMenu } from "./entities/cafeteria-menu.entity";

@Injectable()
export class CafeteriaMenuService {
  constructor(
    @InjectRepository(CafeteriaMenu)
    private cafeteriaMenuRepository: Repository<CafeteriaMenu>,
  ) {}

  create(createCafeteriaMenuDto: CreateCafeteriaMenuDto) {
    return this.cafeteriaMenuRepository.upsert(
      { ...createCafeteriaMenuDto },
      {
        conflictPaths: [ "id", "name", "time", "date" ],
      },
    );
  }

  findAll() {
    return `This action returns all cafeteriaMenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cafeteriaMenu`;
  }
}
