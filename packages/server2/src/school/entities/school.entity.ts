import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { UpdatableCommonEntity } from "src/common/entity";
import { Place } from "src/place/entities/place.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { SchoolArea } from "../school.constant";

@Entity()
export class School extends UpdatableCommonEntity {
  @ApiProperty({ description: "건물번호", example: "ABC-1" })
  @IsString()
  @Column({ type: "varchar" })
  buildingNumber: string;

  @ApiProperty({ description: "(구)건물번호", example: "ABC-2" })
  @IsString()
  @Column({ type: "varchar" })
  oldBuildingNumber: string;

  @ApiProperty({
    description: "구역(N,E,S)",
    example: SchoolArea.N,
    enum: SchoolArea,
    type: "enum",
  })
  @IsEnum(SchoolArea)
  @Column({ type: "enum", enum: SchoolArea })
  area: SchoolArea;

  @OneToOne(() => Place, { onDelete: "CASCADE" })
  @JoinColumn()
  place: Place;
}
