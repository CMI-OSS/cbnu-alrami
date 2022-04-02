import { Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [AdminModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
