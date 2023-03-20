import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { UpdatableCommonEntity } from "src/common/entity";
import { Image } from "src/image/entities/image.entity";
import { School } from "src/school/entities/school.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

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

  @ApiProperty({
    description: "설명",
    example: "이 건물은..",
    default: "",
    required: false,
  })
  @IsString()
  @Column({ type: "varchar", nullable: true })
  description?: string;

  @ApiProperty({
    description: "연락처",
    example: "02-492-xxxx",
    required: false,
  })
  @IsString()
  @Column({ type: "varchar", nullable: true })
  contact?: string;

  @ApiProperty({
    description: "게시물 이미지",
    type: () => Image,
    isArray: true,
    required: false,
  })
  @OneToMany(() => Image, (image) => image.place, {
    nullable: true,
    cascade: true,
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
    eager: true,
  })
  images?: Image[];

  @OneToOne(() => School, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn()
  school?: School;
}
