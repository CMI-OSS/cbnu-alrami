/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "status";

type Props = {
  map: {
    status: boolean;
  };
};

const initialState: Props = {
  map: {
    status: true,
  },
};

export const statusSlice = createSlice({
  name,
  initialState,
  reducers: {
    checkStatus: (
      state,
      action: PayloadAction<{
        status?: boolean;
      }>,
    ) => {
      state.map.status = false;
    },
  },
});

export const { checkStatus } = statusSlice.actions;
export default statusSlice.reducer;
