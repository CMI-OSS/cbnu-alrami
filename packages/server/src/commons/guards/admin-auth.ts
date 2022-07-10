import { AdminAuthGuard } from "./admin-auth.guard";

describe("AuthoritiesGuard", () => {
  it("should be defined", () => {
    expect(new AdminAuthGuard()).toBeDefined();
  });
});
