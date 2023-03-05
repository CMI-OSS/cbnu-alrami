import { useAppDispatch, useAppSelector } from "src/store";

import {
  closeImagePreview,
  nextImagePreview,
  prevImagePreview,
} from "./ImagePreview.store";
import ImagePreviewView from "./ImagePreview.view";

export default function ImagePreview() {
  const dispath = useAppDispatch();
  const { images, isOpen, currentIndex } = useAppSelector(
    (state) => state.ImagePreviewReducer,
  );

  if (!isOpen) return null;

  const handleClickDimmed = () => {
    dispath(closeImagePreview());
  };

  const handleClickNext = () => {
    dispath(nextImagePreview());
  };

  const handleClickPrev = () => {
    dispath(prevImagePreview());
  };

  return (
    <ImagePreviewView
      image={images[currentIndex]}
      enableNext={images.length - 1 > currentIndex}
      enablePrev={currentIndex > 0}
      onClickDimmed={handleClickDimmed}
      onClickNext={handleClickNext}
      onClickPrev={handleClickPrev}
    />
  );
}
