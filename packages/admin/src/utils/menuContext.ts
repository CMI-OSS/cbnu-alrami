import { createContext } from "react";

export interface menuContextConfig {
  status: string;
  setContext: (status: string) => void;
}

export const sidebarMenus: string[] = ["모두 보기", "실행중", "대기중", "장애"];

export const defaultContext: menuContextConfig = {
  status: sidebarMenus[0],

  // TODO: 아래의 ESLint 규칙 config 파일에 적용하기
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setContext: (status: string) => {},
};

export const menuContext = createContext(defaultContext);
