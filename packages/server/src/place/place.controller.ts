import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PlaceCreateRequestDto } from "./dtos/place.create.request.dto";
import { PlaceResponseDto } from "./dtos/place.response.dto";
import { PlaceUpdateRequestDto } from "./dtos/place.update.request.dto";
import { PlacesResponseDto } from "./dtos/places.response.dto";
import { PlaceService } from "./place.service";

@Controller("places")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get("school/:placeId")
  @ApiTags("[place] 캠퍼스맵 도메인 API")
  @ApiOperation({
    summary: "학교 건물 조회 API",
    description: "특정 학교 건물을 조회합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "학교 건물 객체",
    type: PlaceResponseDto,
  })
  async findOne(@Param("placeId") placeId: number): Promise<PlaceResponseDto> {
    return this.placeService.findOne(placeId);
  }

  @Get("school")
  @ApiTags("[place] 캠퍼스맵 도메인 API")
  @ApiOperation({
    summary: "학교 건물 목록 조회 API",
    description: "특정 학교 건물 목록을 조회합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "학교 건물 목록 객체",
    type: PlacesResponseDto,
    isArray: true,
  })
  async find(): Promise<PlacesResponseDto[]> {
    return this.placeService.find();
  }

  @Post("school")
  @ApiTags("[admin] 관리자 API")
  async create(@Body() placeCreateRequestDto: PlaceCreateRequestDto) {
    return this.placeService.create(placeCreateRequestDto);
  }

  @Put("school/:placeId")
  @ApiTags("[admin] 관리자 API")
  update(
    @Param("placeId") placeId: number,
    @Body() placeUpdateRequestDto: PlaceUpdateRequestDto,
  ) {
    return this.placeService.update(placeId, placeUpdateRequestDto);
  }

  @Delete("school/:placeId")
  @ApiTags("[admin] 관리자 API")
  delete(@Param("placeId") placeId: number) {
    return this.placeService.delete(placeId);
  }
}
