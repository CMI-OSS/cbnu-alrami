import { OmitType } from "@nestjs/swagger";

import { AdminCreateDto } from "./admin-create.dto";

export class AdminUpdateDto extends OmitType(AdminCreateDto, [ "password" ]) {}
