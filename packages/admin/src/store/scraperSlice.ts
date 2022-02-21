/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScraperLog, ScraperState, ScraperType } from "@shared/types";
import { LogPayload, ScraperChangePayload } from "@shared/types/Socket";

const name = "scraper";

interface Scraper {
  type: ScraperType;
  state: ScraperState;
  logs: Array<ScraperLog>;
}

interface Props {
  scrapers: Array<Scraper>;
}

const initialState: Props = {
  scrapers: [
    { type: "notice", state: ScraperState.Stopped, logs: [] },
    { type: "collegeSchedule", state: ScraperState.Stopped, logs: [] },
    { type: "domitoryCafeteria", state: ScraperState.Stopped, logs: [] },
    { type: "studentCafeteria", state: ScraperState.Stopped, logs: [] },
  ],
};

export const scraperSlice = createSlice({
  name,
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<ScraperChangePayload>) => {
      state.scrapers.forEach((scraper) => {
        if (scraper.type === action.payload.type) {
          scraper.state = action.payload.state;
        }
      });
    },
    appendLog: (state, action: PayloadAction<LogPayload>) => {
      state.scrapers.forEach((scraper) => {
        if (scraper.type === action.payload.type) {
          scraper.logs.push(action.payload.log);
        }
      });
    },
  },
});

export const { changeState, appendLog } = scraperSlice.actions;
export default scraperSlice.reducer;
