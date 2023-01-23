import axios from "../common/http";

interface CreateCafeteriaMenuProps {
  cafeteriaId: number;
  menu: {
    content: string;
    date: string;
    time: number;
  };
}

export function createCafeteriaMenu(cafeteriaMenu: CreateCafeteriaMenuProps) {
  return axios.post(
    `/cafeterias/${cafeteriaMenu.cafeteriaId}/menus`,
    cafeteriaMenu.menu,
  );
}
