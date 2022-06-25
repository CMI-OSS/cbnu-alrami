import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AdminCredential } from "src/auth/dto/adminCredential.dto";
import { Authority } from "src/commons/constants/enums";
import { Authorities } from "src/commons/decorators/Authorities.decorator";
import { PageQuery } from "src/commons/decorators/PageQuery.decorator";
import { UserField } from "src/commons/decorators/userField.decorator";
import { Admin } from "src/commons/entities/admin.entity";
import { User } from "src/commons/entities/user.entity";
import { AuthoritiesGuard } from "src/commons/guards/authorities.guard";
import { FindManyOptions } from "typeorm";

import { AdminService } from "./admin.service";
import { AdminCreateDto } from "./dto/adminCreate.dto";

@Controller("admins")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("me")
  async getMe(@UserField() user: AdminCredential): Promise<AdminCredential> {
    return user;
  }

  @Get()
  @Authorities(Authority.Super)
  async find(@PageQuery() query: FindManyOptions<Admin>): Promise<Admin[]> {
    return this.adminService.find(query);
  }

  @Post()
  async create(
    @Body() adminCreateDto: AdminCreateDto,
  ): Promise<Admin> {
    return this.adminService.create(adminCreateDto);
  }
}
