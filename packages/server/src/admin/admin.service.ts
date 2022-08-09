import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/commons/entities/admin.entity";
import { FindOneOptions } from "typeorm";

import { errors } from "../commons/error";
import { AdminCreateDto } from "./dto/admin-create.dto";
import { AdminUpdateDto } from "./dto/admin-update.dto";
import { AdminRepository } from "./repository/admin.repository";

const { ADMIN_NOT_FOUND, NICKNAME_DUPLICATED, LOGIN_ID_DUPLICATED } = errors;

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository) private adminRepository: AdminRepository,
  ) {}

  async findOne(query: FindOneOptions<Admin>): Promise<Admin> {
    const res = await this.adminRepository.findOne(query);
    if (!res) throw ADMIN_NOT_FOUND;
    return res;
  }

  async find(): Promise<Admin[]> {
    const res = await this.adminRepository.find({
      select: [ "loginId", "nickname", "authority" ],
    });
    return res;
  }

  async create(adminCreateDto: AdminCreateDto): Promise<number> {
    const { loginId, nickname } = adminCreateDto;

    const admins = await this.adminRepository.find({
      where: [
        { loginId: adminCreateDto.loginId },
        { nickname: adminCreateDto.nickname },
      ],
    });

    admins.forEach((admin) => {
      if (admin.loginId === loginId) throw LOGIN_ID_DUPLICATED;
    });
    admins.forEach((admin) => {
      if (admin.nickname === nickname) throw NICKNAME_DUPLICATED;
    });
    const adminEntity = await this.adminRepository.create(adminCreateDto);
    const { id } = await this.adminRepository.save(adminEntity);

    return id;
  }

  async update(adminId: number, adminUpdateDto: AdminUpdateDto) {
    const { loginId, nickname, authority } = adminUpdateDto;
    await this.adminRepository.update(adminId, {
      loginId,
      nickname,
      authority,
    });
  }

  async delete(adminId: number): Promise<void> {
    await this.adminRepository.delete({ id: adminId });
  }
}
