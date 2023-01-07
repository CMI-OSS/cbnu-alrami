import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Article } from "src/article/entities/article.entity";
import { CommonEntity } from "src/common/entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Image extends CommonEntity {
  @IsString()
  @Column({ type: "varchar" })
  @ApiProperty({ description: "이미지 URL" })
  url: string;

  @ManyToOne(() => Article, (article) => article.images, {
    nullable: true,
  })
  @JoinColumn({ name: "article_id" })
  article?: Article;
}
