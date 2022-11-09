import { UpdatableCommonEntity } from "src/common/entity";
import { Entity } from "typeorm";

@Entity()
export class Board extends UpdatableCommonEntity {}
