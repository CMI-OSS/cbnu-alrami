import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CafeteriaName } from "./cafeteria-menu.constant";
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

  find(name: CafeteriaName, date: string) {
    return this.cafeteriaMenuRepository.find({ where: { name, date } });
  }
}
