/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "mapStatus";

type Props = {
  map: {
    isDisplayFloatingButton: boolean;
    isDisplayTooltip: boolean;
  };
};

const initialState: Props = {
  map: {
    isDisplayFloatingButton: true,
    isDisplayTooltip: true,
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
    hideTooltipButtonStatus: (
      state,
      action: PayloadAction<{
        isDisplayTooltip?: boolean;
      }>,
    ) => {
      state.map.isDisplayTooltip = false;
    },
  },
});

export const { hideFloatingButtonStatus, hideTooltipButtonStatus } =
  statusSlice.actions;
export default statusSlice.reducer;
