import { Admin } from "src/admin/entities/admin.entity";
import { Board } from "src/board/entities/board.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Article extends UpdatableCommonEntity {
  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "mediumtext" })
  content: string;

  @Column({ type: "varchar", nullable: true })
  url?: string;

  @Column({ type: "datetime" })
  dateTime: Date;

  @ManyToOne(() => Board, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  board?: Board;

  @ManyToOne(() => Admin, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  author?: Admin;
}
