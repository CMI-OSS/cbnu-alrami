import { Controller, Get } from '@nestjs/common';
import { UserField } from 'src/@decorator/userField.decorator';
import { AdminCredential } from 'src/auth/dto/adminCredential.dto';

@Controller('admins')
export class AdminController {
  @Get('me')
  // eslint-disable-next-line class-methods-use-this
  async getMe(@UserField() user: AdminCredential): Promise<AdminCredential>{
    return user;
  }
}
