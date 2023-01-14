import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { UpdatableCommonEntity } from "src/common/entity";
import { Image } from "src/image/entities/image.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Place extends UpdatableCommonEntity {
  @ApiProperty({ description: "장소명", example: "양진재" })
  @IsString()
  @Column({ type: "varchar" })
  name: string;

  @ApiProperty({ description: "위도", example: 36.62417046575352 })
  @IsNumber()
  @Column({ type: "double" })
  latitude: number;

  @ApiProperty({ description: "경도", example: 127.45967706911435 })
  @IsNumber()
  @Column({ type: "double" })
  longtitude: number;

  @ApiProperty({
    description: "주소",
    example: "충청북도 청주시 서원구 충대로 1",
  })
  @IsString()
  @Column({ type: "varchar" })
  address: string;

  @OneToMany(() => Image, (image) => image.place, {
    nullable: true,
  })
  images?: Image[];
}
