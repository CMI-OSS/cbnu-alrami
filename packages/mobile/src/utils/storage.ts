import { Restaurant } from "src/type";

const REPRESENTATIVE_RESTAURANT = "REPRESENTATIVE_RESTAURANT" as const;
const SHOW_REPRESENTATIVE_RESTAURANT_GUIDE =
  "SHOW_REPRESENTATIVE_RESTAURANT_GUIDE" as const;

export const getRepresentativeRestaurant = () => {
  const item = localStorage.getItem(REPRESENTATIVE_RESTAURANT);
  return item;
};

export const setRepresentativeRestaurant = (restaurant: Restaurant) => {
  if (restaurant === "") {
    showRepresentativeRestaurantGuide();
  }
  localStorage.setItem(REPRESENTATIVE_RESTAURANT, restaurant);
};

export const showRepresentativeRestaurantGuide = () => {
  localStorage.setItem(SHOW_REPRESENTATIVE_RESTAURANT_GUIDE, "true");
};

export const unshowRepresentativeRestaurantGuide = () => {
  localStorage.removeItem(SHOW_REPRESENTATIVE_RESTAURANT_GUIDE);
};

export const isShowRepresentativeRestaurantGuide = () => {
  const isShown =
    localStorage.getItem(SHOW_REPRESENTATIVE_RESTAURANT_GUIDE) ?? "true";
  return isShown === "true";
};
