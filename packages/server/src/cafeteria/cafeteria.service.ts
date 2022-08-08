import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cafeteria } from "src/commons/entities/cafeteria.entity";
import { errors } from "src/commons/error";

import { CafeteriaCreateDto } from "../cafeteria/dto/cafeteria.create.dto";
import { CafeteriaResponseDto } from "./dto/cafeteria.response.dto";
import { CafeteriaMenuRepository } from "./repository/cafeteria-menu.repository";
import { CafeteriaRepository } from "./repository/cafeteria.repository";

const { CAFETERIA_NOT_FOUND } = errors;

@Injectable()
export class CafeteriaService {
  constructor(
    @InjectRepository(CafeteriaRepository)
    private readonly cafeteriaRepository: CafeteriaRepository,
    @InjectRepository(CafeteriaMenuRepository)
    private readonly cafeteriaMenuRepository: CafeteriaMenuRepository,
  ) {}

  async find(): Promise<Cafeteria[]> {
    const cafeterias = await this.cafeteriaRepository.find();
    return cafeterias;
  }

  async findByIdAndDate(
    cafeteriaId: number,
    date: string,
  ): Promise<CafeteriaResponseDto[]> {
    const cafeterias = await this.cafeteriaMenuRepository.findByIdAndDate(
      cafeteriaId,
      date,
    );
    if (!cafeterias) throw CAFETERIA_NOT_FOUND;

    return cafeterias;
  }

  async create(cafeteriaId: number, cafeteriaCreateDto: CafeteriaCreateDto) {
    const cafeteria = await this.cafeteriaRepository.findOne({
      id: cafeteriaId,
    });
    const result = await this.cafeteriaMenuRepository.save({
      cafeteria,
      ...cafeteriaCreateDto,
    });
    return result;
  }
}
