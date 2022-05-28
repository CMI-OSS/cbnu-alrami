/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "placeStatus";

type Props = {
  hash: {
    hashNumber: number;
  };
};

const initialState: Props = {
  hash: {
    hashNumber: 0,
  },
};

export const placeSlice = createSlice({
  name,
  initialState,
  reducers: {
    setHashMenu: (
      state,
      action: PayloadAction<{
        hashNumber: number;
      }>,
    ) => {
      state.hash.hashNumber = action.payload.hashNumber;
    },
  },
});

export const { setHashMenu } = placeSlice.actions;
export default placeSlice.reducer;
