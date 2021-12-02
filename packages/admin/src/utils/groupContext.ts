import { createContext } from "react";

// FIXME: 그룹 수가 너무 많아 Enum으로 미리 정의해놓을 수 없음.
// 리덕스 적용할 때 함께 고려해야 할 듯 합니다.

export type GroupContextConfig = {
  group: string;
  setGroup: (status: string) => void;
};

const defaultContext: GroupContextConfig = {
  group: "모두보기",

  // TODO: 전역 관리에 리덕스 적용하기
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setGroup: () => {},
};

export const GroupContext = createContext(defaultContext);
