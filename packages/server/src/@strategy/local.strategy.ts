import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";
import { AdminCredential } from "src/auth/dto/adminCredential.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'loginId',passwordField: 'password'});
  }

  async validate(username: string, password: string): Promise<AdminCredential>{
    const user = this.authService.validate({ loginId: username, password });
    return user;
  }

}