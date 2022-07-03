import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity()
export class Image extends CommonEntity {
  @Column({ type: "varchar" })
  url: string;
}
