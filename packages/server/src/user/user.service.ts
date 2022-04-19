import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/commons/entities/user.entity";
import { errors } from "src/commons/error";
import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
} from "typeorm";

import { UserCreateDto } from "./dto/userCreate.dto";
import { UserRepository } from "./repository/user.repository";

const { USER_NOT_FOUND, DB_ERROR } = errors;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async findOne(query: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(query);
    if (!user) throw USER_NOT_FOUND;
    return user;
  }

  async find(query: FindManyOptions<User>): Promise<User[]> {
    const user = await this.userRepository.find(query);
    return user;
  }

  async create(userCreateDto: UserCreateDto): Promise<User> {
    const createdUser = await this.userRepository.create(userCreateDto);
    if (!createdUser) throw DB_ERROR;
    return createdUser;
  }

  async delete(query: FindConditions<User>): Promise<DeleteResult> {
    const deleteResult = await this.userRepository.delete(query);
    if (!deleteResult.raw) throw DB_ERROR;
    return deleteResult;
  }

  async update(
    query: FindConditions<User>,
    userUpdateDto: DeepPartial<User>,
  ): Promise<ObjectLiteral[]> {
    const updateResult = await this.userRepository.update(query, userUpdateDto);
    if (!updateResult.raw) throw DB_ERROR;
    return updateResult.generatedMaps;
  }
}
