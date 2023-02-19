import { CafeteriaMenu } from "@shared/swagger-api/generated";
import { Restaurant } from "src/type";

import { Menu } from "./type";

export const CAFETERIA_MENUS: CafeteriaMenu["name"][] = [
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
