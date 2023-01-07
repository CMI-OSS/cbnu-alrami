import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CommonEntity } from "src/common/entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Image extends CommonEntity {
  @IsString()
  @Column({ type: "varchar" })
  @ApiProperty({ description: "이미지 URL" })
  url: string;
}
