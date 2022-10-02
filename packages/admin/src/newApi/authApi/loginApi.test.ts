import { loginApi } from "./loginApi";

describe(loginApi.name, () => {
  test("cmi account", async () => {
    const result = await loginApi({
      loginId: "cmi",
      password: "cmi1234",
    });
    expect(result).toEqual({
      type: "LoginApiOutput_Success",
      xAccessToken: expect.any(String),
    });
  });

  test("unknown account", async () => {
    const result = await loginApi({
      loginId: "qwer1234",
      password: "qwrwqr",
    });
    expect(result).toEqual({
      type: "LoginApiOutput_Error",
      error: expect.any(Object),
    });
  });
});
