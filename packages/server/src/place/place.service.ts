import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { Place } from "../commons/entities/place.entity";
import { School } from "../commons/entities/school.entity";
import { ImageService } from "../image/image.service";
import { PlaceCreateRequestDto } from "./dtos/place.create.request.dto";
import { PlaceResponseDto } from "./dtos/place.response.dto";
import { PlaceUpdateRequestDto } from "./dtos/place.update.request.dto";
import { PlacesResponseDto } from "./dtos/places.response.dto";
import { PlaceImageRepository } from "./repository/place.image.repository";
import { PlaceRepository } from "./repository/place.repository";
import { SchoolRepository } from "./repository/school.repository";

@Injectable()
export class PlaceService {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly schoolRepository: SchoolRepository,
    private readonly imageService: ImageService,
    private readonly placeImageRepository: PlaceImageRepository,
  ) {}

  async findOne(placeId: number): Promise<PlaceResponseDto> {
    const place = await this.placeRepository.findOne(placeId);

    return {
      ...place,
      images: place.images.map((el) => {
        return el.image;
      }),
    };
  }

  async find(): Promise<PlacesResponseDto[]> {
    const places = await this.placeRepository.findAll();

    return places.map(({ images, ...place }) => {
      return {
        ...place,
        image: images[0]?.image,
      };
    });
  }

  @Transactional()
  async create(placeCreateRequestDto: PlaceCreateRequestDto) {
    const place = Builder(Place)
      .name(placeCreateRequestDto.name)
      .latitude(placeCreateRequestDto.latitude)
      .longtitude(placeCreateRequestDto.longtitude)
      .address(placeCreateRequestDto.address)
      .contact(placeCreateRequestDto.contact)
      .description(placeCreateRequestDto.description)
      .tags(placeCreateRequestDto.tags)
      .build();

    const placeEntity = await this.placeRepository.save(place);

    const school = Builder(School)
      .place(placeEntity)
      .buildingNumber(placeCreateRequestDto.buildingNumber)
      .oldBuildingNumber(placeCreateRequestDto.oldBuildingNumber)
      .area(placeCreateRequestDto.area)
      .build();

    await this.schoolRepository.save(school);

    await Promise.all(
      placeCreateRequestDto.imageIds.map(async (imageId) => {
        const image = await this.imageService.findById(imageId);
        await this.placeImageRepository.saveImages(image, placeEntity);
      }),
    );
  }

  @Transactional()
  async update(placeId: number, placeUpdateRequestDto: PlaceUpdateRequestDto) {
    const place = Builder(Place)
      .name(placeUpdateRequestDto.name)
      .latitude(placeUpdateRequestDto.latitude)
      .longtitude(placeUpdateRequestDto.longtitude)
      .address(placeUpdateRequestDto.address)
      .contact(placeUpdateRequestDto.contact)
      .description(placeUpdateRequestDto.description)
      .tags(placeUpdateRequestDto.tags)
      .build();

    await this.placeRepository.update(placeId, place);
    const placeEntity = await this.placeRepository.findOne(placeId);

    await this.placeImageRepository.delete({ place: placeEntity });

    const school = Builder(School)
      .buildingNumber(placeUpdateRequestDto.buildingNumber)
      .oldBuildingNumber(placeUpdateRequestDto.oldBuildingNumber)
      .area(placeUpdateRequestDto.area)
      .build();

    await this.schoolRepository.update(placeId, school);

    await Promise.all(
      placeUpdateRequestDto.imageIds.map(async (imageId) => {
        const image = await this.imageService.findById(imageId);
        await this.placeImageRepository.saveImages(image, placeEntity);
      }),
    );
  }

  async delete(placeId: number) {
    await this.placeRepository.delete({ id: placeId });
  }
}
