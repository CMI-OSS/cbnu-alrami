import { Injectable } from '@nestjs/common';
import { Admin } from 'src/@entities/admin.entity';
import { AdminService } from 'src/admin/admin.service';
import { AdminCreateDto } from 'src/admin/dto/adminDto';
import { UserCreateDto } from 'src/user/dto/userCreateDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AdminLoginDto, LoginDto } from './dto/adminLoginDto';
import { TokenDto } from './dto/tokenDto';
import { UserLoginDto } from './dto/userLogin.dto';
@Injectable()
export class AuthService {
  constructor(private userService:UserService, private adminService:AdminService){}

  async join(adminCreateDto: AdminCreateDto): Promise<Admin>{
    return new Admin();
  }

  async adminLogin(adminLoginDto:AdminLoginDto):Promise<TokenDto>{
    return new TokenDto();
  }
  
  async userLogin(userLoginDto:UserLoginDto):Promise<TokenDto>{
    return new TokenDto();
  }
  
  matchPassword(inputPassword:string, entityPassword:string): boolean{
    return true;
  }

  modifyPassword(newPassword:string, entityPassword:string): boolean{
    return true;
  }


}
