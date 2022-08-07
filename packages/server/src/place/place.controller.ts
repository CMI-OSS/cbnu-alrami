import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { PlaceCreateRequestDto } from "./dtos/place.create.request.dto";
import { PlaceUpdateRequestDto } from "./dtos/place.update.request.dto";
import { PlaceService } from "./place.service";

@Controller("places")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get("school/:placeId")
  async findOne(@Param("placeId") placeId: number) {
    return this.placeService.findOne(placeId);
  }

  @Get("school")
  async find() {
    return this.placeService.find();
  }

  @Post("school")
  async create(@Body() placeCreateRequestDto: PlaceCreateRequestDto) {
    return this.placeService.create(placeCreateRequestDto);
  }

  @Put("school/:placeId")
  update(
    @Param("placeId") placeId: number,
    @Body() placeUpdateRequestDto: PlaceUpdateRequestDto,
  ) {
    return this.placeService.update(placeId, placeUpdateRequestDto);
  }

  @Delete("school/:placeId")
  delete(@Param("placeId") placeId: number) {
    return this.placeService.delete(placeId);
  }
}
