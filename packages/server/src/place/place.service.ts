import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageService } from "src/image/image.service";
import { Place } from "src/place/entities/place.entity";
import { SchoolDto } from "src/school/dto/create-school.dto";
import { SchoolArea } from "src/school/school.constant";
import { SchoolService } from "src/school/school.service";
import { Repository } from "typeorm";

import { CreatePlaceDto } from "./dto/create-place.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    private imageService: ImageService,
    private schoolService: SchoolService,
  ) {}

  findSchool(area?: SchoolArea) {
    return this.placeRepository.find({
      where: {
        ...(area
          ? {
              school: {
                area,
              },
            }
          : { school: true }),
      },
      relations: { school: true },
    });
  }

  findOneSchool(id: number) {
    return this.placeRepository.findOne({
      where: {
        id,
      },
      relations: { school: true },
    });
  }

  async create(createPlaceDto: CreatePlaceDto) {
    const images = await this.imageService.findImages(
      createPlaceDto.imageIds ?? [],
    );

    return this.placeRepository.save({ ...createPlaceDto, images });
  }

  async createSchool(createPlaceDto: CreatePlaceDto) {
    const place = await this.create(createPlaceDto);

    const school = await this.schoolService.create(
      createPlaceDto.school as SchoolDto,
      place,
    );

    await this.placeRepository.update(place.id, { school });

    return place;
  }

  async update(id: number, { imageIds, ...placeDto }: UpdatePlaceDto) {
    const place = await this.placeRepository.findOne({ where: { id } });

    if (!place) throw new NotFoundException();

    if (imageIds) {
      const images = await this.imageService.findImages(imageIds);
      place.images = images;
      place.save();
    }

    return this.placeRepository.update(id, { ...placeDto });
  }

  async updateSchool(id: number, updatePlaceDto: UpdatePlaceDto) {
    const { school: schoolDto, ...placeDto } = updatePlaceDto;

    await this.update(id, placeDto);

    const place = await this.findOneSchool(id);

    if (schoolDto && place?.school)
      await this.schoolService.update(place.school.id, schoolDto);

    return place;
  }

  async remove(id: number) {
    return this.placeRepository.delete({ id });
  }
}
