/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@admin/common/axios";
import { ScraperType } from "./scraperType";
import { StatusType } from "./statusType";
import { RootState } from ".";

const name = "view";

type Props = {
  scraper: ScraperType;
  group: string;
  status: StatusType;
};

const initialState: Props = {
  scraper: ScraperType.Notice,
  group: "모두보기",
  status: StatusType.All,
};

export const viewSlice = createSlice({
  name,
  initialState,
  reducers: {
    setScraper: (state, action: PayloadAction<ScraperType>) => {
      state.scraper = action.payload;
    },
    setGroup: (state, action: PayloadAction<string>) => {
      state.group = action.payload;
    },
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: {},
});

export const { setScraper, setGroup, setStatus } = viewSlice.actions;
export const view = (state: RootState) => state.view;
