import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AdminCreateDto } from "src/admin/dto/adminCreate.dto";
import { Public } from "src/commons/decorators/public.decorator";
import { UserField } from "src/commons/decorators/userField.decorator";
import { LocalGuard } from "src/commons/guards/local.guard";

import { AuthService } from "./auth.service";
import { AdminCredential } from "./dto/adminCredential.dto";
import { AdminLoginDto } from "./dto/adminLogin.dto";
import { TokenDto } from "./dto/token.dto";

@Controller("auth")
@ApiTags("[auth] 인증 API")
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Public()
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
  async adminJoin(@Body() adminCreateDto: AdminCreateDto): Promise<boolean> {
    return this.authService.join(adminCreateDto);
  }

  @Public()
  @UseGuards(LocalGuard)
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
  async adminLogin(@UserField() user: AdminCredential): Promise<TokenDto> {
    return this.authService.adminLogin(user);
  }
}
