import { Body, Controller, Inject, Post } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AdminCreateDto } from "src/admin/dto/adminCreate.dto";
import { Public } from "src/commons/decorators/public.decorator";

import { AuthService } from "./auth.service";
import { AdminLoginDto } from "./dto/adminLogin.dto";
import { TokenDto } from "./dto/token.dto";

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
  async adminJoin(@Body() adminCreateDto: AdminCreateDto): Promise<boolean> {
    return this.authService.join(adminCreateDto);
  }

  @Public()
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
  async adminLogin(@Body() admin: AdminLoginDto): Promise<TokenDto> {
    return this.authService.adminLogin(admin);
  }
}
