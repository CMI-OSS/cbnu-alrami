import { OmitType, PartialType } from "@nestjs/swagger";

import { CreateBoardDto } from "./create-board.dto";

export class UpdateBoardDto extends PartialType(
  OmitType(CreateBoardDto, [ "id" ]),
) {}
