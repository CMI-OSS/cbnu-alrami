import axios from "axios";

const baseURL = "https://dev-server.cmi.kro.kr/";

const caxios = axios.create({
  baseURL,
  headers: {
    "content-Type": "application/json",
  },
});

export default caxios;
