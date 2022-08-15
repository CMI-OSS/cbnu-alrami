import { ApiProperty } from "@nestjs/swagger";

export class BoardTreeAllResponseDto {
  @ApiProperty({ description: "board id(pk값)" })
  id!: number;

  @ApiProperty({ description: "board 이름" })
  name!: string;

  @ApiProperty({ description: "board url" })
  url!: string;

  @ApiProperty({ description: "구독 여부" })
  isSubscribing!: boolean;

  @ApiProperty({ description: "알림 여부" })
  isNoticing!: boolean;

  @ApiProperty({ description: "하위 board" })
  children: BoardTreeAllResponseDto[];

  setIsSubscribing(newIsSubscribing) {
    this.isSubscribing = newIsSubscribing;
  }

  setIsNoticing(newIsNoticiing) {
    this.isNoticing = newIsNoticiing;
  }
}
