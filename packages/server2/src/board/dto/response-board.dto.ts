import { ApiProperty } from "@nestjs/swagger";

import { Board } from "../entities/board.entity";

export class ResponseBoardDto extends Board {
  @ApiProperty({
    description: "구독 여부",
    example: true,
    nullable: true,
    required: false,
  })
  isSubscribe?: boolean;

  @ApiProperty({
    description: "알림 여부",
    example: true,
    nullable: true,
    required: false,
  })
  isNotice?: boolean;
}
