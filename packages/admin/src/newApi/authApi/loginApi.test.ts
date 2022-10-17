import { loginApi } from "./loginApi";

describe(loginApi.name, () => {
  test.skip("cmi account", async () => {
    const result = await loginApi({
      loginId: "",
      password: "",
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
