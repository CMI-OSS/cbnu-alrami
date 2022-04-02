import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Admin } from 'src/@entities/admin.entity';
import { AdminCredential } from './dto/adminCredential.dto';
import { LoginDto } from './dto/adminLoginDto';
import { TokenDto } from './dto/tokenDto';
import { Request } from 'express';
import { UserCreateDto } from 'src/user/dto/userCreateDto';
import { UserLoginDto } from './dto/userLogin.dto';
@Controller('auth')
export class AuthController {
  
  @Post()
  async join(@Body() userCreateDto:UserCreateDto):Promise<Admin>{
    return new Admin();
  }

  @Post()
  async adminLogin(@Body() loginDto:LoginDto):Promise<TokenDto>{
    return new TokenDto();
  }

  @Get()
  async getMe(@Req() req:Request): Promise<AdminCredential>{
    return new AdminCredential();
  }

  @Post()
  async userLogin(@Body() userLoginDto:UserLoginDto):Promise<TokenDto>{
    return new TokenDto();
  }

}
