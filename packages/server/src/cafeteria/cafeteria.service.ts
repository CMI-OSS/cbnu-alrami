import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cafeteria } from "src/commons/entities/cafeteria.entity";
import { errors } from "src/commons/error";
import { FindManyOptions, FindOneOptions } from "typeorm";

import { CafeteriaRepository } from "./repository/cafeteria.repository";

const { CAFETERIA_NOT_FOUND } = errors;
@Injectable()
export class CafeteriaService {
  constructor(
    @InjectRepository(CafeteriaRepository)
    private cafeteriaRepository: CafeteriaRepository,
  ) {}

  async find(query: FindManyOptions): Promise<Cafeteria[]>{
    const cafeterias = await this.cafeteriaRepository.find(query);
    return cafeterias
  }

  async findOne(query: FindOneOptions): Promise<Cafeteria>{
    const cafeteria = await this.cafeteriaRepository.findOne(query);
    if (!cafeteria) throw CAFETERIA_NOT_FOUND;
    return cafeteria;
  }
}
