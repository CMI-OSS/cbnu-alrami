import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Admin } from "src/commons/entities/admin.entity";

import { AdminSession } from "../commons/decorators/admin-session.decorator";
import { AdminAuthGuard } from "../commons/guards/admin-auth.guard";
import { AdminMasterGuard } from "../commons/guards/admin-master.guard";
import { AdminService } from "./admin.service";
import { AdminUpdateDto } from "./dto/admin-update.dto";

@ApiTags("[admin] 관리자 API")
@Controller("admins")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @ApiOperation({
    summary: "관리자 본인 조회",
    description: "관리자 본인의 정보를 조회합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "관리자 정보 객체",
    type: Admin,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Admin JWT",
    required: true,
  })
  @Get("me")
  @UseGuards(AdminAuthGuard)
  async findOne(@AdminSession() admin: Admin): Promise<Admin> {
    return admin;
  }

  @ApiOperation({
    summary: "관리자 전체 목록 조회",
    description: "관리자 전체 목록을 조회합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "관리자 정보 배열 객체",
    type: Admin,
    isArray: true,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Super 권한을 가진 Admin JWT",
    required: true,
  })
  @Get()
  @UseGuards(AdminMasterGuard)
  async find(): Promise<Admin[]> {
    return this.adminService.find();
  }

  @ApiOperation({
    summary: "관리자 수정",
    description: "관리자 정보를 수정합니다",
  })
  @ApiBody({
    description: "계정 만들기",
    type: AdminUpdateDto,
  })
  @ApiResponse({
    status: 200,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Super 권한을 가진 Admin JWT",
    required: true,
  })
  @Put(":adminId")
  @UseGuards(AdminMasterGuard)
  async update(
    @Param("adminId") adminId: number,
    @Body() adminUpdateDto: AdminUpdateDto,
  ) {
    return this.adminService.update(adminId, adminUpdateDto);
  }

  @ApiOperation({
    summary: "관리자 삭제",
    description: "관리자 정보를 삭제합니다",
  })
  @ApiResponse({
    status: 204,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "Super 권한을 가진 Admin JWT",
    required: true,
  })
  @Delete(":adminId")
  @UseGuards(AdminMasterGuard)
  async delete(@Param("adminId") adminId: number) {
    return this.adminService.delete(adminId);
  }
}
