/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "noticeStatus";

type Props = {
  origin: string;
  breadcrumb: { path: string; name: string }[];
};

const initialState: Props = {
  origin: "",
  breadcrumb: [
    {
      path: "/board",
      name: "전체",
    },
  ],
};

export const boardSlice = createSlice({
  name,
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<{ origin: Props["origin"] }>) => {
      state.origin = action.payload.origin;
    },
    pushBreadcrumb: (
      state,
      action: PayloadAction<{ breadcrumb: Props["breadcrumb"][number] }>,
    ) => {
      const { name, path } = action.payload.breadcrumb;
      state.breadcrumb = state.breadcrumb.concat({
        name,
        path: `${state.breadcrumb.at(-1)?.path || "/board"}/${path}`,
      });
    },
    sliceBreadcrumb: (state, action: PayloadAction<{ diff: number }>) => {
      state.breadcrumb = state.breadcrumb.slice(0, -action.payload.diff);
    },
  },
});

export const { setOrigin, pushBreadcrumb, sliceBreadcrumb } =
  boardSlice.actions;
export default boardSlice.reducer;
