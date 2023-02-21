import { atom } from "recoil";

type BoardType = "article" | "setting";

export const boardOriginStatus = atom<BoardType>({
  key: "boardOriginState",
  default: "article",
});
