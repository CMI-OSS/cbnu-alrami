export class SubscribeBaseDto {
  id: number;
  name: string;
}

export class SubscribeInfoDto extends SubscribeBaseDto {
  isNoticing: boolean;
  parents: SubscribeBaseDto[];
}
