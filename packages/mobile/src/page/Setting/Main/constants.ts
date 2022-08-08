import {
  Alarm,
  AppVersion,
  Email,
  Food,
  Person,
  Speaker,
} from "src/components/atoms/icon";

const settingMenuList = [
  {
    icon: Alarm,
    label: "구독/알림",
    to: "./subscribe",
  },
  {
    icon: Food,
    label: "대표식당",
    to: "./cafeteria",
  },
  {
    icon: Speaker,
    label: "공지사항",
    to: "./notice",
  },
  {
    icon: AppVersion,
    label: "앱 버전",
    to: "./appversion",
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

export { settingMenuList };
