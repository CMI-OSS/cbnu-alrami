import { Test, TestingModule } from "@nestjs/testing";

import { AdminService } from "./admin.service";
import { AdminRepository } from "./repository/admin.repository";

describe("AdminService", () => {
  let service: AdminService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ AdminService, AdminRepository ],
    }).compile();
    service = module.get<AdminService>(AdminService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("AdminService 메소드 유무 확인", () => {
    expect(typeof service.create).toBe("function");
    expect(typeof service.find).toBe("function");
    expect(typeof service.delete).toBe("function");
    expect(typeof service.findOne).toBe("function");
    expect(typeof service.update).toBe("function");
  });
});
