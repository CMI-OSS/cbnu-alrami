import { MealTime } from "src/commons/constants/enums";
import { Cafeteria } from "src/commons/entities/cafeteria.entity";

export class CafeteriaMenuCreateDto {
  cafeteria?: number|Cafeteria;
  content: string;

  time: MealTime;

  date: Date;
}
