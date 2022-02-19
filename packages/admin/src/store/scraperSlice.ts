/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScraperState, ScraperType } from "@shared/types";

const name = "scraper";

interface Scraper {
  type: ScraperType;
  state: ScraperState;
}

interface Props {
  scrapers: Array<Scraper>;
}

const initialState: Props = {
  scrapers: [
    { type: "notice", state: ScraperState.Stopped },
    { type: "collegeSchedule", state: ScraperState.Stopped },
    { type: "domitoryCafeteria", state: ScraperState.Stopped },
    { type: "studentCafeteria", state: ScraperState.Stopped },
  ],
};

export const scraperSlice = createSlice({
  name,
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<Scraper>) => {
      state.scrapers.forEach((scraper) => {
        if (scraper.type === action.payload.type) {
          scraper.state = action.payload.state;
        }
      });
    },
  },
});

export const { changeState } = scraperSlice.actions;
export default scraperSlice.reducer;
