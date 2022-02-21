/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScraperLog, ScraperState, ScraperType } from "@shared/types";
import { AppendLogPayload } from "@shared/types/Socket/AppendLog";
import { ChangeScenarioQueuePayload } from "@shared/types/Socket/ChangeScenarioQueue";
import { ChangeScraperStatePayload } from "@shared/types/Socket/ChangeScraperState";
import { InitScraperPayload } from "@shared/types/Socket/InitScraper";

const name = "scraper";

interface Scraper {
  type: ScraperType;
  state: ScraperState;
  logs: Array<ScraperLog>;
  prevScenario: {
    title: string;
  };
  currentScenario: {
    title: string;
  };
  nextScenario: {
    title: string;
  };
}

interface Props {
  scrapers: Array<Scraper>;
}

export const initialScraper: Scraper = {
  type: "notice",
  state: ScraperState.Stopped,
  logs: [],
  prevScenario: {
    title: "",
  },
  currentScenario: {
    title: "",
  },
  nextScenario: {
    title: "",
  },
};

const initialState: Props = {
  scrapers: [
    { ...initialScraper, type: "notice" },
    { ...initialScraper, type: "collegeSchedule" },
    { ...initialScraper, type: "domitoryCafeteria" },
    { ...initialScraper, type: "studentCafeteria" },
  ],
};

export const scraperSlice = createSlice({
  name,
  initialState,
  reducers: {
    init: (state, action: PayloadAction<InitScraperPayload>) => {
      state.scrapers.forEach((scraper, index) => {
        if (scraper.type === action.payload.type) {
          state.scrapers[index] = {
            type: scraper.type,
            ...action.payload.scraper,
          };
        }
      });
    },
    changeState: (state, action: PayloadAction<ChangeScraperStatePayload>) => {
      state.scrapers.forEach((scraper) => {
        if (scraper.type === action.payload.type) {
          scraper.state = action.payload.state;
        }
      });
    },
    appendLog: (state, action: PayloadAction<AppendLogPayload>) => {
      state.scrapers.forEach((scraper) => {
        if (scraper.type === action.payload.type) {
          scraper.logs.push(action.payload.log);
        }
      });
    },
    changeScenarioQueue: (
      state,
      action: PayloadAction<ChangeScenarioQueuePayload>,
    ) => {
      state.scrapers.forEach((scraper) => {
        if (scraper.type === action.payload.type) {
          scraper.prevScenario = action.payload.prevScenario;
          scraper.currentScenario = action.payload.currentScenario;
          scraper.nextScenario = action.payload.nextScenario;
        }
      });
    },
  },
});

export const { init, changeState, appendLog, changeScenarioQueue } =
  scraperSlice.actions;
export default scraperSlice.reducer;
