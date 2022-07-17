import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdminCredential } from "src/auth/dto/adminCredential.dto";
import { Authority } from "src/commons/constants/enums";
import { Authorities } from "src/commons/decorators/Authorities.decorator";
import { PageQuery } from "src/commons/decorators/PageQuery.decorator";
import { UserSession } from "src/commons/decorators/UserSession.decorator";
import { Admin } from "src/commons/entities/admin.entity";
import { FindManyOptions } from "typeorm";

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
  @Authorities(Authority.Super)
  async find(@PageQuery() query: FindManyOptions<Admin>): Promise<Admin[]> {
    return this.adminService.find(query);
  }

  @Post()
  async create(@Body() adminCreateDto: AdminCreateDto): Promise<Admin> {
    return this.adminService.create(adminCreateDto);
  }
}
