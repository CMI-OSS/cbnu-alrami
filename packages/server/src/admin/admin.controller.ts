import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Admin } from "src/commons/entities/admin.entity";

import { AdminSession } from "../commons/decorators/admin-session.decorator";
import { AdminCouncilGuard } from "../commons/guards/admin-council.guard";
import { AdminMasterGuard } from "../commons/guards/admin-master.guard";
import { AdminService } from "./admin.service";
import { AdminCreateDto } from "./dto/admin-create.dto";
import { AdminUpdateDto } from "./dto/admin-update.dto";

@ApiTags("[admin] 관리자 API")
@Controller("admins")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("me")
  @UseGuards(AdminCouncilGuard)
  async findOne(@AdminSession() admin: Admin): Promise<Admin> {
    return admin;
  }

  @Get()
  @UseGuards(AdminMasterGuard)
  async find(): Promise<Admin[]> {
    return this.adminService.find();
  }

  @Post()
  @UseGuards(AdminMasterGuard)
  async create(@Body() adminCreateDto: AdminCreateDto) {
    return this.adminService.create(adminCreateDto);
  }

  @Put(":adminId")
  @UseGuards(AdminMasterGuard)
  async update(
    @Param("adminId") adminId: number,
    @Body() adminUpdateDto: AdminUpdateDto,
  ) {
    return this.adminService.update(adminId, adminUpdateDto);
  }

  @Delete(":adminId")
  @UseGuards(AdminMasterGuard)
  async delete(@Param("adminId") adminId: number) {
    return this.adminService.delete(adminId);
  }
}
