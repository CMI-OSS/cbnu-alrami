/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "board";

type Props = {
  board: {
    write: {
      title: string;
      boardKind: string;
      boardContent: string;
    };
  };
};

const initialState: Props = {
  board: {
    write: {
      title: "",
      boardKind: "",
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
        title?: string;
        boardKind?: string;
        boardContent?: string;
      }>,
    ) => {
      state.board.write = { ...state.board.write, ...action.payload };
    },
  },
});

export const { writeBoard } = boardSlice.actions;
export default boardSlice.reducer;
