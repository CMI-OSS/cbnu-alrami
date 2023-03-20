import { PartialType } from "@nestjs/swagger";

import { CreateBoardAuthorityDto } from "./create-board-authority.dto";

export class UpdateBoardAuthorityDto extends PartialType(
  CreateBoardAuthorityDto,
) {}
