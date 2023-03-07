import {
  Alarm,
  AppVersion,
  Email,
  Food,
  Person,
  Speaker,
} from "src/components/atoms/icon";
import { CMI_BOARD_ID } from "src/constants";
import { Restaurant } from "src/type";

const settingMenuList = [
  {
    icon: Alarm,
    label: "구독/알림",
    to: "./board",
  },
  {
    icon: Food,
    label: "대표식당",
    to: "./cafeteria",
  },
  {
    icon: Speaker,
    label: "공지사항",
    to: `/board/article/${CMI_BOARD_ID}`,
  },
  {
    icon: AppVersion,
    label: "앱 버전",
    to: "./",
  },
  {
    icon: Email,
    label: "문의하기",
    to: "./contact",
  },
  {
    icon: Person,
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
    "앱 버전": "최신버전(0.0.0)",
  };
};

export { cafeterias, settingConfig, settingMenuList };
