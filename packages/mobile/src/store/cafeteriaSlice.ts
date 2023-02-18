/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CafeteriaMenu } from "@shared/swagger-api/generated";

const name = "settingStatus";

type Props = {
  cafeteria: {
    selectedMenu: CafeteriaMenu["name"];
  };
};

const initialState: Props = {
  cafeteria: {
    selectedMenu: CafeteriaMenu.name.BONGWAN,
  },
};

export const cafeteriaSlice = createSlice({
  name,
  initialState,
  reducers: {
    selectMenu: (
      state,
      action: PayloadAction<{
        selectedMenu: CafeteriaMenu["name"];
      }>,
    ) => {
      state.cafeteria.selectedMenu = action.payload.selectedMenu;
    },
  },
});

export const { selectMenu } = cafeteriaSlice.actions;
export default cafeteriaSlice.reducer;
