/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "settingStatus";

type Props = {
  cafeteria: {
    selectedMenu: number;
  };
};

const initialState: Props = {
  cafeteria: {
    selectedMenu: 1,
  },
};

export const cafeteriaSlice = createSlice({
  name,
  initialState,
  reducers: {
    selectMenu: (
      state,
      action: PayloadAction<{
        selectedMenu: number;
      }>,
    ) => {
      state.cafeteria.selectedMenu = action.payload.selectedMenu;
    },
  },
});

export const { selectMenu } = cafeteriaSlice.actions;
export default cafeteriaSlice.reducer;
