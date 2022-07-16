import {
  Subscribe,
  Food,
  Speaker,
  Experiment,
  Help,
  AppVersion,
  Email,
  Person,
} from "src/components/atoms/icon";
import { settingLabel } from "src/type";

interface settingMenu {
  id: number;
  icon: any;
  label: keyof settingLabel;
  to: string;
}

const settingMenuList: settingMenu[] = [
  {
    id: 1,
    icon: Subscribe,
    label: "구독/알림",
    to: "./subscribe",
  },
  {
    id: 2,
    icon: Food,
    label: "대표식당",
    to: "./cafeteria",
  },
  {
    id: 3,
    icon: Experiment,
    label: "실험실",
    to: "./experiment",
  },
  {
    id: 4,
    icon: Speaker,
    label: "공지사항",
    to: "./notice",
  },
  {
    id: 5,
    icon: Help,
    label: "도움말",
    to: "./help",
  },
  {
    id: 6,
    icon: AppVersion,
    label: "앱 버전",
    to: "./appversion",
  },
  {
    id: 7,
    icon: Email,
    label: "문의하기",
    to: "./contact",
  },
  {
    id: 8,
    icon: Person,
    label: "만든이",
    to: "./creator",
  },
];

export { settingMenuList };
