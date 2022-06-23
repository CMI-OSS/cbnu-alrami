import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "weather" })
export class Weather {
  @ApiProperty({ description: "PK" })
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ApiProperty({ description: "현재 날씨" })
  @Column({ type: "varchar", length: 50 })
  currentWeather: string;

  @ApiProperty({ description: "현재 온도" })
  @Column({ type: "int" })
  currentTemp: number;

  @ApiProperty({ description: "오늘 최고 온도" })
  @Column({ type: "int" })
  maxTemp: number;

  @ApiProperty({ description: "오늘 최저 온도" })
  @Column({ type: "int" })
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
