import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Article } from "src/article/entities/article.entity";
import { CommonEntity } from "src/common/entity";
import { Place } from "src/place/entities/place.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Image extends CommonEntity {
  @IsString()
  @Column({ type: "varchar" })
  @ApiProperty({ description: "이미지 URL" })
  url: string;

  @IsNumber()
  @Column({ type: "int", nullable: true })
  @ApiProperty({ description: "순서" })
  turn?: number;

  @ManyToOne(() => Article, (article) => article.images, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  article?: Article;

  @ManyToOne(() => Place, (place) => place.images, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  place?: Place;
}
