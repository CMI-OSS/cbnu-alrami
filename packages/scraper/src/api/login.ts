import axios from "../common/http";

export async function login(loginId: string, password: string) {
  return axios
    .post("/auth/admins/login", {
      loginId,
      password,
    })
    .then((res) => {
      const { xAccessToken } = res.data;
      axios.defaults.headers.common["x-access-token"] = xAccessToken;
    })
    .catch((err) => {
      console.log(err);
    });
}
