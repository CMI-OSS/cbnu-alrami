import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity("weather")
export class Weather extends CommonEntity {
  @ApiProperty({ description: "현재 날씨" })
  @Column({ type: "varchar", length: 50, nullable: true })
  currentWeather?: string;

  @ApiProperty({ description: "현재 온도" })
  @Column("decimal", { precision: 4, scale: 2, nullable: true })
  currentTemp?: number;

  @ApiProperty({ description: "오늘 최고 온도" })
  @Column("decimal", { precision: 4, scale: 2 })
  maxTemp: number;

  @ApiProperty({ description: "오늘 최저 온도" })
  @Column("decimal", { precision: 4, scale: 2 })
  minTemp: number;

  @ApiProperty({ description: "오전 날씨" })
  @Column({ type: "varchar", length: 50 })
  amWeather: string;

  @ApiProperty({ description: "오후 날씨" })
  @Column({ type: "varchar", length: 50 })
  pmWeather: string;

  @ApiProperty({ description: "날짜" })
  @Column({ type: "date" })
  date: Date;

  @ApiProperty({ description: "시간 단위" })
  @Column({ type: "int" })
  hour: number;
}
