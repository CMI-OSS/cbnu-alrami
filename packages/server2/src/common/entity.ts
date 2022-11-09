import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdDateTime: Date;
}

export abstract class UpdatableCommonEntity extends CommonEntity {
  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedDateTime: Date;
}
