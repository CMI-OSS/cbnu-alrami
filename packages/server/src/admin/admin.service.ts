import { Inject, Injectable } from '@nestjs/common';
import { Admin } from 'src/@entities/admin.entity';
import { DeepPartial, DeleteResult, ObjectLiteral} from 'typeorm';
import { AdminCreateDto } from './dto/adminDto';
import { AdminRepository } from './repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(@Inject(AdminRepository)private adminRepository:AdminRepository){}
  
  async read(id:number): Promise<Admin>{
    const res = await this.adminRepository.findOneBy({id});
    if(!res)throw new Error();
    return res;
  }

  async delete(id: number): Promise<DeleteResult> {
    const res = await this.adminRepository.delete(id);
    if(!res.raw)throw new Error();
    return res;
  }

  async createAdmin(adminCreateDto: AdminCreateDto): Promise<Admin>{
    const admin = await this.adminRepository.create(adminCreateDto);
    if(!admin)throw new Error();
    return admin;
  }

  async modifyAdmin(id: number, adminDto: DeepPartial<AdminCreateDto>): Promise<ObjectLiteral[]>{
    const updateResult = await this.adminRepository.update({id}, adminDto);
    if(!updateResult.raw) throw new Error();
    return updateResult.generatedMaps;
  }
}
