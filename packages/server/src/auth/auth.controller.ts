import {
  Body,
  Controller,
  Inject,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AdminCreateDto } from "src/admin/dto/admin-create.dto";

import { AdminSession } from "../commons/decorators/admin-session.decorator";
import { Admin } from "../commons/entities/admin.entity";
import { AdminAuthGuard } from "../commons/guards/admin-auth.guard";
import { AdminMasterGuard } from "../commons/guards/admin-master.guard";
import { AuthService } from "./auth.service";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { TokenDto } from "./dto/token.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("auth")
@ApiTags("[auth] 인증 API")
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post("admins/join")
  @ApiOperation({
    summary: "관리자 계정 생성",
    description: "관리자 계정 생성 API",
  })
  @ApiBody({
    description: "계정 만들기",
    type: AdminCreateDto,
  })
  @ApiCreatedResponse({
    description: "계정 생성 성공",
    type: Boolean,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Super 권한을 가진 Admin JWT",
  })
  @UseGuards(AdminMasterGuard)
  async adminJoin(@Body() adminCreateDto: AdminCreateDto): Promise<boolean> {
    return this.authService.join(adminCreateDto);
  }

  @Post("admins/login")
  @ApiOperation({
    summary: "관리자 로그인",
    description: "관리자 로그인 API",
  })
  @ApiBody({
    description: "관리자 로그인 아이디, 비밀번호",
    type: AdminLoginDto,
  })
  @ApiCreatedResponse({
    description: "로그인 성공",
    type: TokenDto,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Admin JWT",
  })
  async adminLogin(@Body() admin: AdminLoginDto): Promise<TokenDto> {
    return this.authService.adminLogin(admin);
  }

  @Patch()
  @ApiOperation({
    summary: "관리자 비밀번호 수정",
    description: "관리자 비밀번호를 수정합니다.",
  })
  @ApiBody({
    description: "관리자 기존 비밀번호와 새 비밀번호",
    type: UpdatePasswordDto,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Admin JWT",
  })
  @UseGuards(AdminAuthGuard)
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @AdminSession() admin: Admin,
  ) {
    const { loginId } = admin;

    return this.authService.updatePassword(loginId, updatePasswordDto);
  }
}
