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
import { SuperGuard } from "src/admin/gurads/super.guard";

import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { SchoolService } from "./school.service";

@ApiTags("[school] 학교 API")
@Controller("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @SuperGuard()
  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.schoolService.findOne(id);
  }

  @SuperGuard()
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.update(id, updateSchoolDto);
  }

  @SuperGuard()
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.schoolService.remove(id);
  }
}
