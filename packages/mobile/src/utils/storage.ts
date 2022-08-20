import { Restaurant } from "src/type";

const REPRESENTATIVE_RESTAURANT = "REPRESENTATIVE_RESTAURANT" as const;
const VISITED = "VISITED" as const;
const IS_NOT_FIRST_UNSELECT = "IS_FIRST_UNSELECT" as const;

export const getFavoriteCafeteria = () => {
  const item = localStorage.getItem(REPRESENTATIVE_RESTAURANT);
  if (!item) localStorage.setItem(REPRESENTATIVE_RESTAURANT, "선택안함");
  return item || "선택안함";
};

export const setFavoriteCafeteria = (restaurant: Restaurant) => {
  localStorage.setItem(REPRESENTATIVE_RESTAURANT, restaurant);
};

export const setVisited = () => {
  localStorage.setItem(VISITED, "true");
};

export const getIsVisited = () => {
  const isVisited = localStorage.getItem(VISITED);
  return !!isVisited;
};

export const setIsNotFirstUnselect = () => {
  localStorage.setItem(IS_NOT_FIRST_UNSELECT, "true");
};

export const getIsNotFirstUnselect = () => {
  const isNotFirstUnselect = localStorage.getItem(IS_NOT_FIRST_UNSELECT);
  return !!isNotFirstUnselect;
};
