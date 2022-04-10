/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { Admin } from 'src/@entities/admin.entity';
import { AdminService } from 'src/admin/admin.service';
import { AdminCreateDto } from 'src/admin/dto/adminCreateDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { errors } from 'src/@error';
import { AdminLoginDto } from './dto/adminLoginDto';
import { TokenDto } from './dto/tokenDto';
import { AdminCredential } from './dto/adminCredential.dto';

const { LOGIN_INFO_NOT_FOUND } = errors;

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private adminService: AdminService, private jwtService:JwtService) {}

  async join(adminCreateDto: AdminCreateDto): Promise<boolean>{
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(adminCreateDto.password, salt);
    await this.adminService.create({...adminCreateDto, password:hashedPassword});
    return true;
  }

  async adminLogin(adminCredential:AdminCredential): Promise<TokenDto>{
    const tokens: TokenDto = {
      xAccessToken : this.jwtService.sign(adminCredential),
      // xRefreshToken: this.jwtService.sign({ id:admin.id })
    }
    return tokens;
  }

  async validate({ loginId, password }: AdminLoginDto): Promise<AdminCredential>{
    const { password: hashedPassword, ...admin } = await this.adminService.findOne({
      select: 
        [ 'id', 'authority', 'nickname', 'password' ]
      ,
      where: { loginId }
    });
    if (!admin || !this.matchPassword(password, hashedPassword)) throw LOGIN_INFO_NOT_FOUND;
    return admin;
  }
  
  // async userLogin({fcmToken}): Promise<TokenDto>{
    
  //   return new TokenDto();
  // }
  
  matchPassword(inputPassword: string, entityPassword: string): boolean{
    if (!bcrypt.compareSync(inputPassword, entityPassword)) return false;
    return true;
  }

  // modifyPassword(newPassword:string, entityPassword:string): boolean{
  //   return true;
  // }


}
