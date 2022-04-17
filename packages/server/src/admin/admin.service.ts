import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/commons/entities/admin.entity";
import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
} from "typeorm";
import { AdminCreateDto } from "./dto/adminCreate.dto";
import { AdminRepository } from "./repository/admin.repository";
import { errors } from "../commons/error";

const { ADMIN_NOT_FOUND, NICKNAME_DUPLICATED, LOGIN_ID_DUPLICATED, DB_ERROR } =
  errors;

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

  async find(query: FindManyOptions<Admin>): Promise<Admin[]> {
    const res = await this.adminRepository.find(query);
    return res;
  }

  async delete(query: FindConditions<Admin>): Promise<DeleteResult> {
    const res = await this.adminRepository.delete(query);
    if (!res.raw) throw ADMIN_NOT_FOUND;
    return res;
  }

  async create(adminCreateDto: AdminCreateDto): Promise<Admin> {
    const foundAdmins = await this.adminRepository.find({
      where: [
        { loginId: adminCreateDto.loginId },
        { nickname: adminCreateDto.nickname },
      ],
    });
    foundAdmins.forEach((foundAdmin) => {
      if (foundAdmin.loginId === adminCreateDto.loginId)
        throw LOGIN_ID_DUPLICATED;
    });
    // DB조회를 줄이기 위해 이렇게 했습니다.
    foundAdmins.forEach((foundAdmin) => {
      if (foundAdmin.nickname === adminCreateDto.nickname)
        throw NICKNAME_DUPLICATED;
    });
    const admin = this.adminRepository.create(adminCreateDto);
    if (!admin) throw DB_ERROR;
    admin.save();
    return admin;
  }

  async update(
    query: FindConditions<Admin>,
    adminDto: DeepPartial<AdminCreateDto>,
  ): Promise<ObjectLiteral[]> {
    const updateResult = await this.adminRepository.update(query, adminDto);
    if (!updateResult.raw) throw DB_ERROR;
    return updateResult.generatedMaps;
  }
}
