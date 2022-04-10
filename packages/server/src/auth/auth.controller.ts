import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { Admin } from 'src/@entities/admin.entity';
import { AdminCreateDto } from 'src/admin/dto/adminCreateDto';
import { LocalGuard } from 'src/@guard/local.guard';
import { UserField } from 'src/@decorator/userField.decorator';
import { JwtGuard } from 'src/@guard/jwt.guard';
import { Public } from 'src/@decorator/public.decorator';
import { TokenDto } from './dto/tokenDto';
import { AuthService } from './auth.service';
import { AdminCredential } from './dto/adminCredential.dto';

@Controller('auth')
export class AuthController {
  
  // eslint-disable-next-line no-useless-constructor
  constructor(@Inject(AuthService)private authService:AuthService){}

  @Public()
  @Post('admins/join')
  async adminJoin(@Body() adminCreateDto: AdminCreateDto): Promise<Admin>{
    return this.authService.join(adminCreateDto);
  }


  @Public()
  @UseGuards(LocalGuard)
  @Post('admins/login')
  async adminLogin(@UserField() user: AdminCredential):Promise<TokenDto> {
    return this.authService.adminLogin(user);
  }



}
