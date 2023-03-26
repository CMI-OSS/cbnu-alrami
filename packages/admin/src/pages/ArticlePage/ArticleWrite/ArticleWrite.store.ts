/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "ArticleWrite";

export type ArticleWriteProps = {
  title: string;
  content: string;
  images?: Array<{ id: number; url: string }>;
};

const initialState: ArticleWriteProps = {
  title: "",
  content: "",
  images: [],
};

export const ArticleWriteSlice = createSlice({
  name,
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    init(state, action: PayloadAction<ArticleWriteProps>) {
      return action.payload;
    },
    setTitle(state, action: PayloadAction<{ title: string }>) {
      state.title = action.payload.title;
    },
    setContent(state, action: PayloadAction<{ content: string }>) {
      state.content = action.payload.content;
    },
    appendImages(
      state,
      action: PayloadAction<Array<{ id: number; url: string }>>,
    ) {
      state.images = [ ...(state.images ?? []), ...action.payload ];
    },
    removeImage(state, action: PayloadAction<{ id: number }>) {
      if (!state.images) return;

      state.images = state.images.filter(
        (image) => image.id !== action.payload.id,
      );
    },
    moveLeftImage(state, action: PayloadAction<{ index: number }>) {
      if (!state.images) return;

      const { index } = action.payload;
      const temp = state.images[index - 1];
      state.images[index - 1] = state.images[index];
      state.images[index] = temp;
    },
    moveRightImage(state, action: PayloadAction<{ index: number }>) {
      if (!state.images) return;

      const { index } = action.payload;
      const temp = state.images[index + 1];
      state.images[index + 1] = state.images[index];
      state.images[index] = temp;
    },
    initImgList: (
      state,
      action: PayloadAction<ArticleWriteProps["images"]>,
    ) => {
      state.images = action.payload;
    },
  },
});

export const {
  reset,
  init,
  setTitle,
  setContent,
  appendImages,
  removeImage,
  moveLeftImage,
  moveRightImage,
  initImgList,
} = ArticleWriteSlice.actions;
const ArticelWriteReducer = ArticleWriteSlice.reducer;
export default ArticelWriteReducer;
