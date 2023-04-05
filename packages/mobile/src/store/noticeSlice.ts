import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "noticeStatus";

type Props = {
  origin: "article" | "setting";
};

const initialState: Props = {
  origin: "article",
};

export const noticeSlice = createSlice({
  name,
  initialState,
  reducers: {
    setBoardOrigin: (
      state,
      action: PayloadAction<{ origin: Props["origin"] }>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.origin = action.payload.origin;
    },
  },
});

export const { setBoardOrigin } = noticeSlice.actions;
export default noticeSlice.reducer;
