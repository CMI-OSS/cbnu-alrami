import axios, { AxiosError } from "axios";

export default axios.create({
  baseURL: "https://dev-server.cmi.kro.kr",
});

export const isAxiosError = (error: any): error is AxiosError =>
  error.name === "AxiosError";
