import { Restaurant } from "src/type";

const REPRESENTATIVE_RESTAURANT = "REPRESENTATIVE_RESTAURANT" as const;
const SHOW_REPRESENTATIVE_RESTAURANT_GUIDE =
  "SHOW_REPRESENTATIVE_RESTAURANT_GUIDE" as const;

export const get대표식당 = () => {
  const item = localStorage.getItem(REPRESENTATIVE_RESTAURANT);
  return item;
};

export const set대표식당 = (restaurant: Restaurant) => {
  if (restaurant === "") {
    set대표식당마지막가이드();
  }
  localStorage.setItem(REPRESENTATIVE_RESTAURANT, restaurant);
};

export const set대표식당마지막가이드 = () => {
  localStorage.setItem(SHOW_REPRESENTATIVE_RESTAURANT_GUIDE, "true");
};

export const unset대표식당마지막가이드 = () => {
  localStorage.removeItem(SHOW_REPRESENTATIVE_RESTAURANT_GUIDE);
};

export const isShown대표식당가이드 = () => {
  const isShown =
    localStorage.getItem(SHOW_REPRESENTATIVE_RESTAURANT_GUIDE) ?? "true";
  return isShown === "true";
};
