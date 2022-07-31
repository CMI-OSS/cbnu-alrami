/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { imgType } from "src/types";

const name = "board";

type Props = {
  board: {
    write: {
      boardImgList: imgType[];
      boardTitle: string;
      boardCategory: string;
      boardContent: string;
      currentImgIdx: number;
    };
  };
};

const initialState: Props = {
  board: {
    write: {
      boardImgList: [],
      boardTitle: "",
      boardCategory: "",
      boardContent: "",
      currentImgIdx: 0,
    },
  },
};

export const boardSlice = createSlice({
  name,
  initialState,
  reducers: {
    writeBoard: (
      state,
      action: PayloadAction<{
        boardImgList?: imgType[];
        boardTitle?: string;
        boardCategory?: string;
        boardContent?: string;
      }>,
    ) => {
      state.board.write = { ...state.board.write, ...action.payload };
    },
    changeCurrentImg: (state, action) => {
      let idx = action.payload;
      if (
        !state.board.write.boardImgList.length ||
        state.board.write.boardImgList.length <= idx
      )
        idx = 0;
      if (idx < 0) idx = state.board.write.boardImgList.length - 1;
      state.board.write.currentImgIdx = idx;
    },
  },
});

export const { writeBoard, changeCurrentImg } = boardSlice.actions;
export default boardSlice.reducer;
