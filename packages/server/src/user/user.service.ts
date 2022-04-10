import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/@entities/user.entity';
import { DeepPartial, DeleteResult, FindConditions, FindManyOptions, FindOneOptions, ObjectLiteral } from 'typeorm';
import { UserCreateDto } from './dto/userCreateDto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  // eslint-disable-next-line no-useless-constructor
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) { }
  async findOne(query:  FindOneOptions<User>): Promise<User>{
    const user = await this.userRepository.findOne(query);
    if (!user) throw new Error();
    return user;
  }

  async find(query:  FindManyOptions<User>): Promise<User[]>{
    const user = await this.userRepository.find(query);
    if (!user) throw new Error();
    return user;
  }

  async create(userCreateDto: UserCreateDto): Promise<User>{
    const createdUser = await this.userRepository.create(userCreateDto);
    if(!createdUser)throw new Error();
    return createdUser;
  }

  async delete(query:  FindConditions<User>): Promise<DeleteResult>{
    const deleteResult = await this.userRepository.delete(query);
    if(!deleteResult.raw)throw new Error();
    return deleteResult;
  }

  async update(query:  FindConditions<User>, userUpdateDto: DeepPartial<User>):Promise<ObjectLiteral[]>{
    const updateResult = await this.userRepository.update(query, userUpdateDto);
    if(!updateResult.raw)throw new Error();
    return updateResult.generatedMaps;
  }
}
