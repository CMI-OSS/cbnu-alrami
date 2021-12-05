/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@admin/common/axios";
import { Scrapers } from "./scraperEnum";
import { Status } from "./statusEnum";
import { RootState } from ".";

const name = "view";

type Props = {
  scraper: Scrapers;
  group: string;
  status: Status;
};

const initialState: Props = {
  scraper: Scrapers.Notice,
  group: "모두보기",
  status: Status.All,
};

export const viewSlice = createSlice({
  name,
  initialState,
  reducers: {
    setScraper: (state, action: PayloadAction<Scrapers>) => {
      state.scraper = action.payload;
    },
    setGroup: (state, action: PayloadAction<string>) => {
      state.group = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
  extraReducers: {},
});

export const { setScraper, setGroup, setStatus } = viewSlice.actions;
export const view = (state: RootState) => state.view;
