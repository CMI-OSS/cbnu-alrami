import { OmitType } from "@nestjs/swagger";

import { CafeteriaMenu } from "../entities/cafeteria-menu.entity";

export class CreateCafeteriaMenuDto extends OmitType(CafeteriaMenu, [
  "id",
  "createdDateTime",
]) {}
