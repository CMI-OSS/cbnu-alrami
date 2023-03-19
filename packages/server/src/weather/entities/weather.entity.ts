import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { CommonEntity } from "src/common/entity";
import { Column, Entity } from "typeorm";

import { WeatherType } from "../weather.constant";

@Entity()
export class Weather extends CommonEntity {
  @ApiProperty({
    description: "현재 날씨",
    example: WeatherType.Clouds,
    enum: WeatherType,
    required: false,
  })
  @IsEnum(WeatherType)
  @Column("varchar", { nullable: true })
  currentWeather?: WeatherType;

  @ApiProperty({ description: "현재 온도", example: 20.52, required: false })
  @Column("decimal", { precision: 4, scale: 2, nullable: true })
  currentTemp?: number;

  @ApiProperty({ description: "오늘 최고 온도", example: 25.24 })
  @Column("decimal", { precision: 4, scale: 2 })
  maxTemp: number;

  @ApiProperty({ description: "오늘 최저 온도", example: 16.25 })
  @Column("decimal", { precision: 4, scale: 2 })
  minTemp: number;

  @ApiProperty({
    description: "오전 날씨",
    example: WeatherType.Clouds,
    enum: WeatherType,
  })
  @IsEnum(WeatherType)
  @Column("varchar")
  amWeather: WeatherType;

  @ApiProperty({
    description: "오후 날씨",
    example: WeatherType.Clouds,
    enum: WeatherType,
  })
  @IsEnum(WeatherType)
  @Column("varchar")
  pmWeather: WeatherType;

  @ApiProperty({ description: "날짜", example: "2023-01-20" })
  @Column("date")
  date: string;

  @ApiProperty({ description: "시간 단위", example: 5 })
  @Column("int")
  hour: number;
}
