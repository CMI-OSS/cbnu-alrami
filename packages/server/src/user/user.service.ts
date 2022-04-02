import { Injectable } from '@nestjs/common';
import { User } from 'src/@entities/user.entity';
import { UserCreateDto } from './dto/userCreateDto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository){}
  async create(userCreateDto: UserCreateDto): Promise<User>{
    const createdUser = await this.userRepository.create(userCreateDto);
    if(!createdUser)throw new Error();
    return createdUser;
  }

  async delete(id:number): Promise<DeleteResult>{
    const deleteResult = this.userRepository.delete(id);
    if(!deleteResult.raw)throw new Error();
    return deleteResult;
  }

  async modify(query:Object, userUpdateDto: DeepPartial<User>):Promise<ObjectLiteral[]>{
    const updateResult = this.userRepository.update(query, userUpdateDto);
    if(!updateResult.raw)throw new Error();
    return updateResult.generatedMaps;
  }
}
