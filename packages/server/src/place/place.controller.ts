import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { MutationResponse } from "src/common/types/response";
import { SchoolArea } from "src/school/school.constant";

import { CreatePlaceDto } from "./dto/create-place.dto";
import { PlaceSchoolDto } from "./dto/response-place.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";
import { PlaceService } from "./place.service";

@ApiTags("[place] 장소 API")
@Controller("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({
    summary: "학교 건물 조회",
  })
  @ApiQuery({
    name: "area",
    required: false,
    description: "구역(S,N,E)",
    schema: { enum: Object.values(SchoolArea) },
  })
  @ApiOkResponse({ type: PlaceSchoolDto, isArray: true })
  @Get("school")
  findSchool(@Query("area") area?: SchoolArea) {
    return this.placeService.findSchool(area);
  }

  @ApiOperation({
    summary: "학교 건물 상세 조회",
  })
  @ApiOkResponse({ type: PlaceSchoolDto })
  @Get("school/:id")
  findOneSchool(@Param("id") id: number) {
    return this.placeService.findOneSchool(id);
  }

  @ApiOperation({
    summary: "학교 건물 생성",
  })
  @ApiOkResponse({ type: MutationResponse })
  @Post("school")
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.createSchool(createPlaceDto);
  }

  @ApiOperation({
    summary: "학교 건물 수정",
  })
  @ApiOkResponse({ type: MutationResponse })
  @Patch("school/:id")
  update(@Param("id") id: number, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.updateSchool(id, updatePlaceDto);
  }

  @ApiOperation({
    summary: "학교 건물 삭제",
  })
  @ApiOkResponse({ type: MutationResponse })
  @Delete("school/:id")
  remove(@Param("id") id: number) {
    return this.placeService.remove(id);
  }
}
