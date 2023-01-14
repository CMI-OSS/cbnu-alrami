import { UpdatableCommonEntity } from "src/common/entity";
import { Image } from "src/image/entities/image.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Place extends UpdatableCommonEntity {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "double" })
  latitude: number;

  @Column({ type: "double" })
  longtitude: number;

  @Column({ type: "varchar" })
  address: string;

  @OneToMany(() => Image, (image) => image.place, {
    nullable: true,
  })
  images?: Image[];
}
