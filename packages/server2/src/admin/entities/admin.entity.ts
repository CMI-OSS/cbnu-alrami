import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Board } from "src/board/entities/board.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { AdminAuthorityType } from "../admin.constant";

@Entity()
export class Admin extends UpdatableCommonEntity {
  @ApiProperty({
    description: "로그인에 사용할 아이디",
    example: "test",
  })
  @Column("varchar", { length: 20, unique: true })
  @IsString()
  loginId: string;

  @Column("varchar", { select: false })
  password: string;

  @ApiProperty({
    description: "닉네임",
    example: "testnickname",
  })
  @Column("varchar", { length: 20 })
  @IsString()
  nickname: string;

  @ApiProperty({
    description: "권한",
    example: AdminAuthorityType.StudentCouncil,
    enum: AdminAuthorityType,
  })
  @Column({
    type: "enum",
    enum: AdminAuthorityType,
    default: AdminAuthorityType.Guest,
  })
  authoirty?: AdminAuthorityType;

  @ApiProperty({
    description: "권한이 부여된 게시판",
    type: [ Board ],
  })
  @ManyToMany((type) => Board)
  @JoinTable()
  boards: Board[];
}
