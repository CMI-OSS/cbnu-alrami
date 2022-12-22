import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AdminService } from "./admin.service";
import {
  CreateAdmin,
  DeleteAdmin,
  GetAdmin,
  GetAdmins,
  UpdateAdmin,
} from "./admin.swagger";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@ApiTags("[admin] 관리자 API")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @CreateAdmin()
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @GetAdmins()
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @GetAdmin()
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.adminService.findOne(id);
  }

  @UpdateAdmin()
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @DeleteAdmin()
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.adminService.remove(id);
  }
}
