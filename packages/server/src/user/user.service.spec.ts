import { Test, TestingModule } from "@nestjs/testing";
import { Authority } from "src/commons/constants/enums";
import { Admin } from "src/commons/entities/admin.entity";
import { UserService } from "./user.service";

const users: Array<Admin> = [
  {
    id: 1,
    loginId: "guest",
    password: "1234",
    nickname: "string",
    authority: Authority.Guest,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    loginId: "super",
    password: "1234",
    nickname: "string",
    authority: Authority.Super,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    loginId: "student_council",
    password: "1234",
    nickname: "string",
    authority: Authority.StudentCouncil,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ UserService ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("");
});
