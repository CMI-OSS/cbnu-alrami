import axios from "axios";

const baseURL = "https://dev-server.cmi.kro.kr/";

const caxios = axios.create({
  baseURL,
  headers: {
    "content-Type": "application/json",
  },
});

caxios.defaults.headers.common.uuid = "1111";

caxios.interceptors.response.use((response) => {
  if (response.data.error) {
    window.alert(response.data.error);
    return Promise.reject(response.data.error);
  }

  return response;
});

export default caxios;
