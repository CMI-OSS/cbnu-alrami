import { Test, TestingModule } from '@nestjs/testing';
import { Authority } from 'src/@constants/enum';
import { Admin } from 'src/@entities/admin.entity';
import { UserService } from './user.service';

const users: Array<Admin>=[
  {
    id: 1,
    username: "guest",
    password: "1234",
    nickname: "string",
    authority: Authority.Guest,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    username: "super",
    password: "1234",
    nickname: "string",
    authority: Authority.Super,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    username: "student_council",
    password: "1234",
    nickname: "string",
    authority: Authority.StudentCouncil,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]


describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('')
});
