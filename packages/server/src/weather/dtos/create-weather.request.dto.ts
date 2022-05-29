import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWeatherRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "현재 날씨" })
  currentWeather: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "현재 온도" })
  currentTemp: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "오늘 최고 온도" })
  maxTemp: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "오늘 최저 온도" })
  minTemp: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "오전 날씨" })
  amWeather: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "오후 날씨" })
  pmWeather: string;

  @IsNotEmpty()
  @ApiProperty({ description: "날짜" })
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "시간 단위" })
  hour: number;
}
