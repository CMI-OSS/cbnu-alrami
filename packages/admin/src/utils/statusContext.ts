import { createContext } from "react";

export enum StatusConfig {
  all = "모두",
  running = "실행중",
  waiting = "대기중",
  error = "장애",
}

export type StatusContextConfig = {
  status: StatusConfig;
  setStatus: (status: StatusConfig) => void;
};

const defaultContext: StatusContextConfig = {
  status: StatusConfig.all,

  // TODO: 전역 관리에 리덕스 적용하기
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStatus: () => {},
};

export const StatusContext = createContext(defaultContext);
