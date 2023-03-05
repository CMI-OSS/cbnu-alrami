import { Restaurant } from "src/type";

const SELECTED_CAFETERIA = "SELECTED_CAFETERIA" as const;
const SHOW_CAFETERIA_SELECT_GUIDE = "SHOW_CAFETERIA_SELECT_GUIDE" as const;
const SHOW_CAFETERIA_SELECT_FINAL_GUIDE =
  "SHOW_CAFETERIA_SELECT_FINAL_GUIDE" as const;
const TOKEN = "TOKEN" as const;

export const getSelectedCafeteria = () => {
  const item = localStorage.getItem(SELECTED_CAFETERIA);
  if (!item) localStorage.setItem(SELECTED_CAFETERIA, "표시 안함");
  return (item || "표시 안함") as Restaurant;
};

export const setSelectedCafeteria = (restaurant: Restaurant) => {
  localStorage.setItem(SELECTED_CAFETERIA, restaurant);
};

export const setShowCafeteriaSelectGuide = () => {
  localStorage.setItem(SHOW_CAFETERIA_SELECT_GUIDE, "true");
};

export const unsetShowCafeteriaSelectGuide = () => {
  localStorage.setItem(SHOW_CAFETERIA_SELECT_GUIDE, "false");
};

export const getShowCafeteriaSelectGuide = () => {
  const showCafeteriaSelectGuide = localStorage.getItem(
    SHOW_CAFETERIA_SELECT_GUIDE,
  );
  return showCafeteriaSelectGuide;
};

export const setShowCafeteriaSelectFinalGuide = () => {
  localStorage.setItem(SHOW_CAFETERIA_SELECT_FINAL_GUIDE, "true");
};

export const unsetShowCafeteriaSelectFinalGuide = () => {
  localStorage.setItem(SHOW_CAFETERIA_SELECT_FINAL_GUIDE, "false");
};

export const getShowCafeteriaSelectFinalGuide = () => {
  const showCafeteriaSelectFinalGuide = localStorage.getItem(
    SHOW_CAFETERIA_SELECT_FINAL_GUIDE,
  );
  return showCafeteriaSelectFinalGuide;
};

export const getUuid = () => {
  const uuid = localStorage.getItem(TOKEN);
  return uuid ?? undefined;
};

export const setUuid = () => {
  if (!getUuid()) {
    localStorage.setItem(TOKEN, "1111");
  }
};
