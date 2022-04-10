import { Matches } from "class-validator";
import { Authority } from "src/@constants/enums";

export class AdminCredential {
  id: number;

  @Matches(/^[a-z0-9_]{2,18}$/)
  nickname: string;

  authority: Authority;
}
