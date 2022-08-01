export class SubscribeNoticeDto {
  id: number;
  isNoticing: boolean;
}

export class SubscribeInfoDto extends SubscribeNoticeDto {
  name: string;
}
