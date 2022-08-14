export class SubscribeBaseDto {
  boardId: number;
  name: string;
}

export class SubscribeInfoDto extends SubscribeBaseDto {
  isNoticing: boolean;
  parents: SubscribeBaseDto[];
}
