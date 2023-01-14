import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UpdatableCommonEntity } from "src/common/entity";
import { Place } from "src/place/entities/place.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

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

  @ApiProperty({ description: "구역(N,E,S)", example: "N" })
  @IsString()
  @Column({ type: "varchar" })
  area: string;

  @ApiProperty({ type: Place })
  @OneToOne(() => Place)
  @JoinColumn()
  place: Place;
}
