/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "toastStatus";

type Props = {
  hasFooter: boolean;
};

const initialState: Props = {
  hasFooter: true,
};

export const toastSlice = createSlice({
  name,
  initialState,
  reducers: {
    setHasFooter: (
      state,
      action: PayloadAction<{ hasFooter: Props["hasFooter"] }>,
    ) => {
      state.hasFooter = action.payload.hasFooter;
    },
  },
});

export const { setHasFooter } = toastSlice.actions;
export default toastSlice.reducer;
