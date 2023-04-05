/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "noticeStatus";

type Props = {
  origin: string;
};

const initialState: Props = {
  origin: "",
};

export const boardSlice = createSlice({
  name,
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<{ origin: Props["origin"] }>) => {
      state.origin = action.payload.origin;
    },
  },
});

export const { setOrigin } = boardSlice.actions;
export default boardSlice.reducer;
