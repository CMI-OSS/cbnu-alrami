import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MutationResponse } from "src/common/types/response";

import { AdminService } from "./admin.service";
import {
  CreateAdmin,
  DeleteAdmin,
  GetAdmin,
  GetAdmins,
  GetAuthoriyBoards,
  GetMe,
  Login,
  UpdateAdmin,
} from "./admin.swagger";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { LoginDto } from "./dto/login.dto";
import { ResponseLoginDto } from "./dto/response-login.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminGuard } from "./gurads/admin.guard";
import { SuperGuard } from "./gurads/super.guard";

@ApiTags("[admin] 관리자 API")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @SuperGuard()
  @CreateAdmin()
  @Post()
  async create(
    @Body() createAdminDto: CreateAdminDto,
  ): Promise<MutationResponse> {
    return { success: !!(await this.adminService.create(createAdminDto)) };
  }

  @AdminGuard()
  @GetAuthoriyBoards()
  @Get("board")
  getAuthorityBoards(@Req() req) {
    const { admin } = req;
    return this.adminService.getAuthorityBoards(admin.id);
  }

  @SuperGuard()
  @GetAdmins()
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @AdminGuard()
  @GetMe()
  @Get("/me")
  findMe(@Req() req) {
    console.log(req.admin);
    return req.admin;
  }

  @SuperGuard()
  @GetAdmin()
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.adminService.findOne(id);
  }

  @SuperGuard()
  @UpdateAdmin()
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<MutationResponse> {
    return { success: !!this.adminService.update(id, updateAdminDto) };
  }

  @SuperGuard()
  @DeleteAdmin()
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<MutationResponse> {
    return { success: !!(await this.adminService.remove(id)) };
  }

  @Login()
  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<ResponseLoginDto> {
    return this.adminService.login(loginDto);
  }
}
