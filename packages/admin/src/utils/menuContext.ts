import { createContext } from "react";

export enum MenuConfig {
  all = "모두 보기",
  running = "실행중",
  waiting = "대기중",
  error = "장애",
}

export type MenuContextConfig = {
  status: string;
  setContext: (status: MenuConfig) => void;
};

export const defaultContext: MenuContextConfig = {
  status: MenuConfig.all,

  // TODO: React Context 대체할 전역 관리 툴 적용하기
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setContext: (status) => {},
};

export const MenuContext = createContext(defaultContext);
