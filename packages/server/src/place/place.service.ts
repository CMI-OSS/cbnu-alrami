/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Place } from "src/commons/entities/place.entity";
import { FindOneOptions } from "typeorm";

import { errors } from "../commons/error/index";
import { PlaceRepository } from "./repository/place.repository";

const { PLACE_NOT_FOUND } = errors;
@Injectable()
export class PlaceService {
  constructor(@InjectRepository(PlaceRepository) private placeRepository) {}

  async findOne(query: FindOneOptions<Place>): Promise<Place> {
    const place = await this.placeRepository.findOne(query);
    if (!place) throw PLACE_NOT_FOUND;
    return place;
  }
}
