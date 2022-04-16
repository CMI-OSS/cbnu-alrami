import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Board" })
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  url!: string;
}
