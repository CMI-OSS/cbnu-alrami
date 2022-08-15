import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { AREA } from "../../commons/entities/school.entity";

export class PlaceCreateRequestDto {
  @IsNotEmpty()
  @ApiProperty({ description: "건물 이름", default: "양성재" })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: "건물 위도", default: "36.627633785434874" })
  latitude: number;

  @IsNotEmpty()
  @ApiProperty({ description: "건물 경도", default: "127.45242498284068" })
  longtitude: number;

  @IsNotEmpty()
  @ApiProperty({ description: "건물 주소", default: "충대로 1" })
  address: string;

  @IsOptional()
  @ApiProperty({ description: "건물 전화번호", default: "043-261-0000" })
  contact: string;

  @IsOptional()
  @ApiProperty({ description: "건물 설명", default: "기숙사" })
  description: string;

  @IsOptional()
  @ApiProperty({ description: "건물 태그", default: "" })
  tags: string;

  @IsOptional()
  @ApiProperty({ description: "건물 이미지 Ids", default: "[1, 2, 3]" })
  imageIds: number[];

  @IsNotEmpty()
  @ApiProperty({ description: "건물 번호", default: "N14" })
  buildingNumber: string;

  @IsNotEmpty()
  @ApiProperty({ description: "건물 옛날 번호 ", default: "-" })
  oldBuildingNumber: string;

  @IsOptional()
  @ApiProperty({ description: "건물 위치", default: AREA.EAST })
  area: AREA;
}
