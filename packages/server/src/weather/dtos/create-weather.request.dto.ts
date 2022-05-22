import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateWeatherRequestDto {
  @IsNotEmpty()
  @ApiProperty({ description: "현재 날씨" })
  currentWeather: string;

  @IsNotEmpty()
  @ApiProperty({ description: "현재 온도" })
  currentTemp: number;

  @IsNotEmpty()
  @ApiProperty({ description: "오늘 최고 온도" })
  maxTemp: number;

  @IsNotEmpty()
  @ApiProperty({ description: "오늘 최저 온도" })
  minTemp: number;

  @IsNotEmpty()
  @ApiProperty({ description: "오전 날씨" })
  amWeather: string;

  @IsNotEmpty()
  @ApiProperty({ description: "오후 날씨" })
  pmWeather: string;

  @IsNotEmpty()
  @ApiProperty({ description: "날짜" })
  date: Date;

  @IsNotEmpty()
  @ApiProperty({ description: "시간 단위" })
  hour: number;
}
