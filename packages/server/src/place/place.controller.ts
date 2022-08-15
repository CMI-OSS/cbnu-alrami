import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AdminMasterGuard } from "../commons/guards/admin-master.guard";
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
  @ApiOperation({
    summary: "학교건물 생성",
    description: "학교건물을 생성합니다.",
  })
  @ApiBody({
    description: "학교건물 세부 정보",
    type: PlaceCreateRequestDto,
  })
  @ApiResponse({
    status: 201,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Super 권한을 가진 Admin JWT",
    required: true,
  })
  @UseGuards(AdminMasterGuard)
  async create(@Body() placeCreateRequestDto: PlaceCreateRequestDto) {
    return this.placeService.create(placeCreateRequestDto);
  }

  @Put("school/:placeId")
  @ApiTags("[admin] 관리자 API")
  @ApiOperation({
    summary: "학교건물 수정",
    description: "학교건물을 수정합니다.",
  })
  @ApiBody({
    description: "학교건물 세부 정보",
    type: PlaceUpdateRequestDto,
  })
  @ApiResponse({
    status: 200,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Super 권한을 가진 Admin JWT",
    required: true,
  })
  @UseGuards(AdminMasterGuard)
  update(
    @Param("placeId") placeId: number,
    @Body() placeUpdateRequestDto: PlaceUpdateRequestDto,
  ) {
    return this.placeService.update(placeId, placeUpdateRequestDto);
  }

  @Delete("school/:placeId")
  @ApiTags("[admin] 관리자 API")
  @ApiOperation({
    summary: "학교건물 삭제",
    description: "학교건물을 삭제합니다.",
  })
  @ApiResponse({
    status: 204,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Super 권한을 가진 Admin JWT",
    required: true,
  })
  @UseGuards(AdminMasterGuard)
  delete(@Param("placeId") placeId: number) {
    return this.placeService.delete(placeId);
  }
}
