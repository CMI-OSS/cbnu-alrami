import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRepository } from './repository/admin.repository';

@Module({
  providers: [AdminService, AdminRepository],
  exports: [AdminService, AdminRepository]
})
export class AdminModule {}
