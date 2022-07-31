export class SubscribeNoticeDto {
  id: number;
  name: string;
}

export class SubscribeInfoDto extends SubscribeNoticeDto {
  isNoticing: boolean;
  parents: SubscribeNoticeDto[];
}
