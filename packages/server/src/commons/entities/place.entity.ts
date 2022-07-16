import { double } from "aws-sdk/clients/lightsail";
import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity("place")
export class Place extends CommonEntity {
  @Column({ type: "varchar", unique: true, nullable: false })
  name: string;

  @Column({ type: "double", nullable: false })
  latitude: double;

  @Column({ type: "double", nullable: false })
  longtitude: double;

  @Column("varchar", { nullable: false })
  address: string;

  @Column("varchar", { nullable: false })
  contact: string;

  @Column("varchar", { nullable: true })
  description: string;

  @Column("varchar", { nullable: true })
  tags: string;
}
