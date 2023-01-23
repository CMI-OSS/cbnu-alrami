/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "ImagePreview";

type Props = {
  images: Array<string>;
  isOpen: boolean;
  currentIndex: number;
};

const initialState: Props = {
  images: [],
  isOpen: false,
  currentIndex: 0,
};

export const ImagePreviewSlice = createSlice({
  name,
  initialState,
  reducers: {
    openImagePreview: (
      state,
      action: PayloadAction<{
        images: Array<string>;
        currentIndex: number;
      }>,
    ) => {
      state.images = action.payload.images;
      state.currentIndex = action.payload.currentIndex;
      state.isOpen = true;
    },
    closeImagePreview: (state) => {
      state.isOpen = false;
    },
    nextImagePreview: (state) => {
      if (state.images.length - 1 > state.currentIndex) {
        state.currentIndex += 1;
      }
    },
    prevImagePreview: (state) => {
      if (state.currentIndex !== 0) {
        state.currentIndex -= 1;
      }
    },
  },
});

export const {
  openImagePreview,
  closeImagePreview,
  nextImagePreview,
  prevImagePreview,
} = ImagePreviewSlice.actions;
const ImagePreviewReducer = ImagePreviewSlice.reducer;
export default ImagePreviewReducer;
