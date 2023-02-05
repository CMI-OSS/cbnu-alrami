import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { SchoolArea } from "src/school/school.constant";

import { PlaceSchoolDto } from "./dto/response-place.dto";
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
}
