import { Controller, Get } from "@nestjs/common";
import { PageQuery } from "src/@decorator/PageQuery.decorator";
import { UserField } from "src/@decorator/userField.decorator";
import { Admin } from "src/@entities/admin.entity";
import { AdminCredential } from "src/auth/dto/adminCredential.dto";
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
