import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdminCredential } from "src/auth/dto/adminCredential.dto";
import { Admin } from "src/commons/entities/admin.entity";

import { UserSession } from "../commons/decorators/user-session.decorator";
import { AdminService } from "./admin.service";
import { AdminCreateDto } from "./dto/adminCreate.dto";

@Controller("admins")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("me")
  async getMe(@UserSession() user: AdminCredential): Promise<AdminCredential> {
    return user;
  }

  @Get()
  async find(): Promise<Admin[]> {
    return this.adminService.find();
  }

  @Post()
  async create(@Body() adminCreateDto: AdminCreateDto): Promise<Admin> {
    return this.adminService.create(adminCreateDto);
  }
}
