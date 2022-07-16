/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "mapStatus";

type Props = {
  map: {
    isDisplayFloatingButton: boolean;
    isDisplayTooltip: boolean;
    isConstructionTooltip: boolean;
  };
};

const initialState: Props = {
  map: {
    isDisplayFloatingButton: true,
    isDisplayTooltip: true,
    isConstructionTooltip: false,
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
    hideConstructionTooltipStatus: (
      state,
      action: PayloadAction<{
        isConstructionTooltip?: boolean;
      }>,
    ) => {
      state.map.isConstructionTooltip = true;
    },
  },
});

export const {
  hideFloatingButtonStatus,
  hideTooltipButtonStatus,
  hideConstructionTooltipStatus,
} = statusSlice.actions;
export default statusSlice.reducer;
