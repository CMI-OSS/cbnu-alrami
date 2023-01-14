import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageService } from "src/image/image.service";
import { Place } from "src/place/entities/place.entity";
import { Repository } from "typeorm";

import { CreatePlaceDto } from "./dto/create-place.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    private imageService: ImageService,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    const images = await this.imageService.findImages(
      createPlaceDto.imageIds ?? [],
    );

    return this.placeRepository.save({ ...createPlaceDto, images });
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
}
