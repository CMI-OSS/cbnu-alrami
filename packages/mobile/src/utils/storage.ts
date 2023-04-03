import { Restaurant } from "src/type";
import { v4 as uuidv4 } from "uuid";

const SELECTED_CAFETERIA = "SELECTED_CAFETERIA" as const;
const SHOW_CAFETERIA_SELECT_GUIDE = "SHOW_CAFETERIA_SELECT_GUIDE" as const;
const SHOW_CAFETERIA_SELECT_FINAL_GUIDE =
  "SHOW_CAFETERIA_SELECT_FINAL_GUIDE" as const;
const uuidKey = "uuid" as const;
const RECENT_BOARD_ID = "RECENT_BOARD_ID" as const;

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
  const uuid = localStorage.getItem(uuidKey);
  return uuid ?? createUuid();
};

export const createUuid = () => {
  const uuid = uuidv4();

  localStorage.setItem(uuidKey, uuid);

  return uuid;
};

export const setRecentBoardId = (boardId: number) => {
  localStorage.setItem(RECENT_BOARD_ID, `${boardId}`);
};

export const getRecentBoardId = () => {
  return localStorage.getItem(RECENT_BOARD_ID);
};
