import axios, { isAxiosError } from "../axios";
import { CMIError } from "../types";

const endpoint = "/auth";

export interface LoginApiInput {
  loginId: string;
  password: string;
}

interface LoginApiOutput_Success {
  type: "LoginApiOutput_Success";
  xAccessToken: string;
}

interface LoginApiOutput_Error extends CMIError {
  type: "LoginApiOutput_Error";
}

export type LoginApiOutput = LoginApiOutput_Success | LoginApiOutput_Error;

export const loginApi = async (
  auth: LoginApiInput,
): Promise<LoginApiOutput> => {
  let result;

  try {
    result = await axios.post(`${endpoint}/admins/login`, auth);
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        type: "LoginApiOutput_Error",
        ...(error.response?.data as CMIError),
      };
    }

    return {
      type: "LoginApiOutput_Error",
      error: {
        message: "알 수 없는 에러",
      },
    };
  }

  return {
    type: "LoginApiOutput_Success",
    xAccessToken: result?.data.xAccessToken,
  };
};
