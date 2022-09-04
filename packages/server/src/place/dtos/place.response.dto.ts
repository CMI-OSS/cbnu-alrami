import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

import { Image } from "../../commons/entities/image.entity";
import { School } from "../../commons/entities/school.entity";

export class PlaceResponseDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 1, description: "PK" })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: "school", description: "건물 타입" })
  type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: "양성재", description: "건물 이름" })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 36.627377, description: "건물 위도" })
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 127.452546, description: "건물 경도" })
  longtitude: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: "충북 청주시 서원구 성봉로242번길 31-25",
    description: "건물 주소",
  })
  address: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: "0432613675", description: "건물 전화번호" })
  contact: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: "설명", description: "건물 설명" })
  description: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    default: {
      id: 1,
      createdAt: "2022-07-30T06:11:30.064Z",
      buildingNumber: "1",
      oldBuildingNumber: "2",
      area: null,
    },
    description: "건물 번호",
  })
  school: School;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    default: [
      {
        id: 1,
        createdAt: "2022-07-29T18:27:41.923Z",
        url: "https://cbnutest.s3.ap-northeast-2.amazonaws.com/image/1659119261554.jpeg",
      },
    ],
    description: "건물 이미지",
  })
  images: Image[];
}
