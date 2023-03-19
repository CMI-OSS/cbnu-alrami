import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Place } from "src/place/entities/place.entity";
import { Repository } from "typeorm";

import { SchoolDto } from "./dto/create-school.dto";
import { School } from "./entities/school.entity";

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async create(schoolDto: SchoolDto, place: Place) {
    const school = await this.schoolRepository.save({ ...schoolDto, place });

    return school;
  }

  async update(id: number, schoolDto: SchoolDto) {
    return this.schoolRepository.update(id, schoolDto);
  }
}
