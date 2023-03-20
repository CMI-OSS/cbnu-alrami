import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { CommonEntity } from "src/common/entity";
import { Column, Entity, Unique } from "typeorm";

import { CafeteriaMenuTime, CafeteriaName } from "../cafeteria-menu.constant";

@Entity()
@Unique([ "name", "date", "time" ])
export class CafeteriaMenu extends CommonEntity {
  @ApiProperty({
    description: "학생 식당 혹은 기숙사 이름",
    example: CafeteriaName.HANBIT,
    enum: CafeteriaName,
  })
  @IsEnum(CafeteriaName)
  @Column({ type: "varchar" })
  name: CafeteriaName;

  @ApiProperty({
    description: "메뉴",
    example: "카레라이스",
  })
  @IsString()
  @Column({ type: "varchar" })
  menu: string;

  @ApiProperty({
    description: "YYYY-MM-DD",
    example: "2023-01-01",
  })
  @IsString()
  @Column({ type: "date" })
  date: string;

  @ApiProperty({
    description: "식사 시간 (BREAKFAT, LUNCH, DINNER)",
    example: CafeteriaMenuTime.BREAKFAST,
    enum: CafeteriaMenuTime,
  })
  @IsEnum(CafeteriaMenuTime)
  @Column({ type: "enum", enum: CafeteriaMenuTime })
  time: CafeteriaMenuTime;
}
