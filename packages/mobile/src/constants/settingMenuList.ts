import {
  AppVersion,
  Email,
  Food,
  Person,
  Speaker,
  Subscribe,
} from "src/components/atoms/icon";
import { settingLabel } from "src/type";

interface settingMenu {
  id: number;
  icon: any;
  label: keyof settingLabel;
  to: string;
  width: string;
  height: string;
}

const settingMenuList: settingMenu[] = [
  {
    id: 1,
    icon: Subscribe,
    label: "구독/알림",
    to: "./subscribe",
    width: "16.06px",
    height: "16.06px",
  },
  {
    id: 2,
    icon: Food,
    label: "대표식당",
    to: "./cafeteria",
    width: "14.51px",
    height: "16.92px",
  },
  {
    id: 3,
    icon: Speaker,
    label: "공지사항",
    to: "./notice",
    width: "16.65px",
    height: "15.03px",
  },
  {
    id: 4,
    icon: AppVersion,
    label: "앱 버전",
    to: "./appversion",
    width: "19.76px",
    height: "17.62px",
  },
  {
    id: 5,
    icon: Email,
    label: "문의하기",
    to: "./contact",
    width: "18.02px",
    height: "12.6px",
  },
  {
    id: 6,
    icon: Person,
    label: "만든이",
    to: "./creator",
    width: "16.99px",
    height: "17.1px",
  },
];

export { settingMenuList };
