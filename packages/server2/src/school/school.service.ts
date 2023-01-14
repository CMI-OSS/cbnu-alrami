import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlaceService } from "src/place/place.service";
import { Repository } from "typeorm";

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

  async create({ place: placeDto, ...schoolDto }: CreateSchoolDto) {
    const place = await this.placeService.create(placeDto);

    const school = await this.schoolRepository.save({ ...schoolDto, place });

    await this.placeService.update(place.id, { school });

    return school;
  }

  findAll() {
    return this.schoolRepository.find();
  }

  async findOne(id: number) {
    const school = await this.schoolRepository.findOne({ where: { id } });

    if (!school) throw new NotFoundException();

    return school;
  }

  async update(id: number, { place: plaecDto, ...schoolDto }: UpdateSchoolDto) {
    const school = await this.findOne(id);

    if (plaecDto) {
      await this.placeService.update(school.place.id, plaecDto);
    }

    return this.schoolRepository.update(id, schoolDto);
  }

  async remove(id: number) {
    const school = await this.findOne(id);

    return this.schoolRepository.remove(school);
  }
}
