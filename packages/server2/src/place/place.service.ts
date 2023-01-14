import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageService } from "src/image/image.service";
import { Place } from "src/place/entities/place.entity";
import { Repository } from "typeorm";

import { CreatePlaceDto } from "./dto/create-place.dto";

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
}
