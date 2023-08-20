import * as icons from "@components/atoms/icon/svg";
import { CMI_BOARD_ID } from "src/consts";
import { Restaurant } from "src/type";

const settingMenuList: {
  icon: keyof typeof icons;
  label: string;
  to: string;
}[] = [
  {
    icon: "alarm",
    label: "구독/알림",
    to: "./board",
  },
  {
    icon: "diet",
    label: "대표식당",
    to: "./cafeteria",
  },
  {
    icon: "notice",
    label: "공지사항",
    to: `/board/article/${CMI_BOARD_ID}`,
  },
  {
    icon: "version",
    label: "앱 버전",
    to: "./",
  },
  {
    icon: "mail",
    label: "문의하기",
    to: "./contact",
  },
  {
    icon: "man",
    label: "만든이",
    to: "./creator",
  },
];

const cafeterias: Restaurant[] = [
  "표시 안함",
  "본관",
  "양성재",
  "양진재",
  "별빛식당",
  "은하수식당",
  "한빛식당",
];

type Props = {
  [index: string]: string;
};

const settingConfig = (cafeteria: string): Props => {
  return {
    대표식당: cafeteria,
    "앱 버전": "최신버전(1.0.0)",
  };
};

export { cafeterias, settingConfig, settingMenuList };
