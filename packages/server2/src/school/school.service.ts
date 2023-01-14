import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlaceService } from "src/place/place.service";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { School } from "./entities/school.entity";

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
    private placeService: PlaceService,
  ) {}

  @Transactional()
  async create(createSchoolDto: CreateSchoolDto) {
    const place = await this.placeService.create(createSchoolDto.place);

    return this.schoolRepository.save({ ...createSchoolDto, place });
  }

  findAll() {
    return `This action returns all school`;
  }

  findOne(id: number) {
    return `This action returns a #${id} school`;
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return `This action updates a #${id} school`;
  }

  remove(id: number) {
    return `This action removes a #${id} school`;
  }
}
