export class BoardTreeAllResponseDto {
  id!: number;
  name!: string;
  url!: string;
  children: BoardTreeAllResponseDto[];
}
