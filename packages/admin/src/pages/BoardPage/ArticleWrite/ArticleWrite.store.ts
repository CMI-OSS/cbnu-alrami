/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "ArticleWrite";

type Props = {
  title: string;
  content: string;
  images: Array<{ id: number; url: string }>;
};

const initialState: Props = {
  title: "",
  content: "",
  images: [],
};

export const ArticleWriteSlice = createSlice({
  name,
  initialState,
  reducers: {
    init(state, action: PayloadAction<Props>) {
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
      state.images = [ ...state.images, ...action.payload ];
    },
    removeImage(state, action: PayloadAction<{ id: number }>) {
      state.images = state.images.filter(
        (image) => image.id !== action.payload.id,
      );
    },
    moveLeftImage(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      const temp = state.images[index - 1];
      state.images[index - 1] = state.images[index];
      state.images[index] = temp;
    },
    moveRightImage(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      const temp = state.images[index + 1];
      state.images[index + 1] = state.images[index];
      state.images[index] = temp;
    },
    initImgList: (state) => {
      state.images = [];
    },
  },
});

export const {
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
