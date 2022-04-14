import { Matches } from "class-validator";
import { Authority } from "src/@constants/enums";

export class AdminCreateDto {
  @Matches(/^[a-z0-9_]{4,18}$/)
  loginId: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/)
  password: string;

  @Matches(/^[a-z0-9_]{2,18}$/)
  nickname: string;

  authority: Authority;
}
