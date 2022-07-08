import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class DefaultEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;
}

export abstract class UpdatableCommonEntity extends DefaultEntity {
  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;
}

export function CommonEntity(options?: { updatable: boolean }) {
  if (options?.updatable) return UpdatableCommonEntity;

  return DefaultEntity;
}
