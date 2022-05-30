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
  },
});

export const { writeBoard } = boardSlice.actions;
export default boardSlice.reducer;
