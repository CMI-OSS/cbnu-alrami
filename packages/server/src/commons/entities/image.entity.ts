import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity("image")
export class Image extends CommonEntity {
  @Column({ type: "varchar" })
  url: string;
}
