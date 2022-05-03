import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  content: string;

  @Column({ type: "int", nullable: true })
  priority?: number;

  @Column({ type: "tinyint", nullable: true })
  isHoliday?: number;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate?: Date;
}
