import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity({ name: "image" })
export class Image extends CommonEntity {
  @Column({ type: "int", nullable: true })
  articleId?: number;

  @Column({ type: "varchar" })
  url: string;
}
