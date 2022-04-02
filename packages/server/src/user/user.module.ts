import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule {}
