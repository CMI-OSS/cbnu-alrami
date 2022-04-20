import { Controller, Get } from "@nestjs/common";
import { AdminCredential } from "src/auth/dto/adminCredential.dto";
import { PageQuery } from "src/commons/decorators/PageQuery.decorator";
import { UserField } from "src/commons/decorators/userField.decorator";
import { Admin } from "src/commons/entities/admin.entity";
import { FindManyOptions } from "typeorm";

import { AdminService } from "./admin.service";

@Controller("admins")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("me")
  async getMe(@UserField() user: AdminCredential): Promise<AdminCredential> {
    return user;
  }

  @Get()
  async find(@PageQuery() query: FindManyOptions<Admin>): Promise<Admin[]> {
    return this.adminService.find(query);
  }
}
