import { PartialType } from "@nestjs/swagger";

import { CreateCafeteriaMenuDto } from "./create-cafeteria-menu.dto";

export class UpdateCafeteriaMenuDto extends PartialType(
  CreateCafeteriaMenuDto,
) {}
