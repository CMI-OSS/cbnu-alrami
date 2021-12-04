import { createContext } from "react";

export enum Status {
  All = "모두",
  Running = "실행중",
  Waiting = "대기중",
  Error = "장애",
}

export type StatusContextConfig = {
  status: Status;
  setStatus: (status: Status) => void;
};

const defaultContext: StatusContextConfig = {
  status: Status.All,

  // TODO: 전역 관리에 리덕스 적용하기
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStatus: () => {},
};

export const StatusContext = createContext(defaultContext);
