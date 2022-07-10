import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cafeteria } from "src/commons/entities/cafeteria.entity";
import { errors } from "src/commons/error";

import { CafeteriaResponseDto } from "./dto/cafeteria.response.dto";
import { CafeteriaMenuRepository } from "./repository/cafeteria-menu.repository";
import { CafeteriaRepository } from "./repository/cafeteria.repository";

const { CAFETERIA_NOT_FOUND } = errors;
@Injectable()
export class CafeteriaService {
  constructor(
    @InjectRepository(CafeteriaRepository)
    private cafeteriaRepository: CafeteriaRepository,
    @InjectRepository(CafeteriaMenuRepository)
    private cafeteriaMenuRepository: CafeteriaMenuRepository,
  ) {}

  async find(): Promise<Cafeteria[]> {
    const cafeterias = await this.cafeteriaRepository.find();
    return cafeterias;
  }

  async findById(id: number, date: string): Promise<CafeteriaResponseDto[]> {
    const cafeterias = await this.cafeteriaMenuRepository.findByIdAndDate(
      id,
      date,
    );
    if (!cafeterias) throw CAFETERIA_NOT_FOUND;

    return cafeterias;
  }
}
