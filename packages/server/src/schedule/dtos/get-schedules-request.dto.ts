import { IsNotEmpty } from "class-validator";

export class GetSchedulesRequestDto {
  @IsNotEmpty()
  startDate: Date;

  endDate?: Date;
}
