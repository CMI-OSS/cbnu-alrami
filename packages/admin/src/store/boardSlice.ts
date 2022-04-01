/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "board";

type Props = {
  board: {
    write: {
      boardTitle: string;
      boardCategory: string;
      boardContent: string;
    };
  };
};

const initialState: Props = {
  board: {
    write: {
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
