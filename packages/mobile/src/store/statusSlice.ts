/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "status";

type Props = {
  map: {
    isDisplayFloatingButton: boolean;
  };
};

const initialState: Props = {
  map: {
    isDisplayFloatingButton: true,
  },
};

export const statusSlice = createSlice({
  name,
  initialState,
  reducers: {
    hideFloatingButtonStatus: (
      state,
      action: PayloadAction<{
        isDisplayFloatingButton?: boolean;
      }>,
    ) => {
      state.map.isDisplayFloatingButton = false;
    },
  },
});

export const { hideFloatingButtonStatus } = statusSlice.actions;
export default statusSlice.reducer;
