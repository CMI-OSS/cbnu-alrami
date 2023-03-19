import { ApiProperty } from "@nestjs/swagger";
import { UpdatableCommonEntity } from "src/common/entity";

import { BoardAuthorityType } from "./board-authority.constant";
import { BoardAuthority } from "./entities/board-authority.entity";

type BoardAuthorityProperty = Record<
  Exclude<keyof BoardAuthority, keyof UpdatableCommonEntity>,
  () => PropertyDecorator
>;

export const BoardAuthorityProperty: BoardAuthorityProperty = {
  admin: () =>
    ApiProperty({
      description: "관리자",
      example: 1,
    }),

  board: () =>
    ApiProperty({
      description: "게시판",
      example: 2,
    }),

  authority: () =>
    ApiProperty({
      description: "관리 권한",
      example: BoardAuthorityType.Write,
      enum: BoardAuthorityType,
    }),
};
