/* eslint-disable no-useless-constructor */
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AdminService } from "src/admin/admin.service";
import { AdminCreateDto } from "src/admin/dto/admin-create.dto";
import { errors } from "src/commons/error";
import { UserService } from "src/user/user.service";

import { AdminRepository } from "../admin/repository/admin.repository";
import { AdminCredential } from "./dto/admin-credential.dto";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { TokenDto } from "./dto/token.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

const { LOGIN_INFO_NOT_FOUND } = errors;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly adminRepository: AdminRepository,
  ) {}

  private static matchPassword(
    inputPassword: string,
    entityPassword: string,
  ): boolean {
    if (!bcrypt.compareSync(inputPassword, entityPassword)) return false;
    return true;
  }

  async join(adminCreateDto: AdminCreateDto): Promise<boolean> {
    await this.adminService.create(adminCreateDto);
    return true;
  }

  async adminLogin(adminLogin: AdminLoginDto): Promise<TokenDto> {
    const admin = await this.validate(adminLogin);

    const token: TokenDto = {
      xAccessToken: this.jwtService.sign(admin),
    };
    return token;
  }

  async validate({
    loginId,
    password,
  }: AdminLoginDto): Promise<AdminCredential> {
    const { password: hashedPassword, ...admin } =
      await this.adminService.findOne({
        select: [ "id", "loginId", "authority", "nickname", "password" ],
        where: { loginId },
      });

    if (!admin || !AuthService.matchPassword(password, hashedPassword)) {
      throw LOGIN_INFO_NOT_FOUND;
    }

    return admin;
  }

  async updatePassword(loginId: string, updatePasswordDto: UpdatePasswordDto) {
    const { newPassword, password } = updatePasswordDto;

    const { id } = await this.validate({ loginId, password });

    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await this.adminRepository.update(id, { password: hashedNewPassword });
  }
}
