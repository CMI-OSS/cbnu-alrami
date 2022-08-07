/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "placeStatus";

type Props = {
  hash: {
    hashString: string;
  };
};

const initialState: Props = {
  hash: {
    hashString: "all",
  },
};

export const placeSlice = createSlice({
  name,
  initialState,
  reducers: {
    setHashMenu: (
      state,
      action: PayloadAction<{
        hashString: string;
      }>,
    ) => {
      state.hash.hashString = action.payload.hashString;
    },
  },
});

export const { setHashMenu } = placeSlice.actions;
export default placeSlice.reducer;
