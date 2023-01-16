import { OmitType, PartialType } from "@nestjs/swagger";

import { CreateAdminDto } from "./create-admin.dto";

export class UpdateAdminDto extends PartialType(
  OmitType(CreateAdminDto, [ "loginId" ]),
) {}
