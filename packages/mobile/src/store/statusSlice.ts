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
        isDisplayFloatingButton: boolean;
      }>,
    ) => {
      state.map.isDisplayFloatingButton =
        action.payload.isDisplayFloatingButton;
    },
    hideTooltipButtonStatus: (
      state,
      action: PayloadAction<{
        isDisplayTooltip: boolean;
      }>,
    ) => {
      state.map.isDisplayTooltip = action.payload.isDisplayTooltip;
    },
    hideConstructionTooltipStatus: (
      state,
      action: PayloadAction<{
        isConstructionTooltip: boolean;
      }>,
    ) => {
      state.map.isConstructionTooltip = action.payload.isConstructionTooltip;
    },
  },
});

export const {
  hideFloatingButtonStatus,
  hideTooltipButtonStatus,
  hideConstructionTooltipStatus,
} = statusSlice.actions;
export default statusSlice.reducer;
