import { CafeteriaMenu } from "@shared/swagger-api/generated";
import { Restaurant } from "src/type";

import { Menu } from "../type";

export const CAFETERIA_MENUS: (CafeteriaMenu["name"] | string)[] = [
  CafeteriaMenu.name.BONGWAN,
  CafeteriaMenu.name.YANGJINJAE,
  CafeteriaMenu.name.YANGSUNGJAE,
  CafeteriaMenu.name.HANBIT,
  CafeteriaMenu.name.BYEOLBIT,
  CafeteriaMenu.name.UNHASU,
];

export const CAFETERIA_LIST: Menu<
  CafeteriaMenu["name"],
  Omit<Restaurant, "표시 안함">
>[] = [
  { id: CafeteriaMenu.name.BONGWAN, name: "본관" },
  { id: CafeteriaMenu.name.YANGJINJAE, name: "양진재" },
  { id: CafeteriaMenu.name.YANGSUNGJAE, name: "양성재" },
  { id: CafeteriaMenu.name.HANBIT, name: "한빛식당" },
  { id: CafeteriaMenu.name.BYEOLBIT, name: "별빛식당" },
  { id: CafeteriaMenu.name.UNHASU, name: "은하수식당" },
];

export const CMI_BOARD_ID = 4;

export const BASE_HEAD_META = {
  description: "빠르고 정확한 충북대학교 공지사항 알림이",
  keywords: "충북대학교, 충림이, 공지사항, 어플",
  url: "https://dev-mobile.cmi.kro.kr",
  title: "충북대학교 공지사항 알림이",
  siteName: "충림이",
  href: "/src/assets/favicon/favicon-16x16.png",
  type: "website",
  image: "/src/assets/cbnu_alrami_og.png",
};

export const DEFFERRED_LOADING_TIME = 1000;
export const EMPTY_TITLE_GUIDE_MESSAGE = "제목이 없는 공지사항입니다";
