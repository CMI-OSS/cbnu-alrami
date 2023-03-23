import { OmitType } from "@nestjs/swagger";
import { UpdatableCommonEntityKeys } from "src/common/entity";

import { User } from "../entities/user.entity";

export class CreateUserDto extends OmitType(User, UpdatableCommonEntityKeys) {}
