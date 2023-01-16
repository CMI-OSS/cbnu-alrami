import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@ApiTags("[user] 사용자 API")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
