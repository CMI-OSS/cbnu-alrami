import { useImgUploadMutation } from "src/api/board";
import { useAppDispatch, useAppSelector } from "src/store";

import {
  appendImages,
  moveLeftImage,
  moveRightImage,
  removeImage,
} from "../ArticleWrite.store";
import ImagePreview from "./ImagePreview/ImagePreview";
import { openImagePreview } from "./ImagePreview/ImagePreview.store";
import UploadImageView, { Props as ViewProps } from "./UploadImage.view";

export default function UploadImage() {
  const dispatch = useAppDispatch();
  const [ imgUpload, { isLoading, isSuccess } ] = useImgUploadMutation();
  const { images } = useAppSelector((state) => state.ArticelWriteReducer);
  const uploadFiles = async (files: FileList) => {
    const formData = new FormData();
    if (files) {
      const filesArr = Array.from(files);
      filesArr.forEach((file: File) => {
        formData.append("image", file);
      });

      try {
        const newImages = await imgUpload(formData).unwrap();
        dispatch(appendImages(newImages));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const viewProps: ViewProps = {
    images: images.map((image) => image.url),
    onChange: (e) => {
      if (e.target.files) uploadFiles(e.target.files);
    },
    onClickImage: (e, index) => {
      dispatch(
        openImagePreview({ images: viewProps.images, currentIndex: index }),
      );
    },
    onClickRemove: (e, index) => {
      dispatch(removeImage({ id: images[index].id }));
    },
    onClickLeft: (e, index) => {
      dispatch(moveLeftImage({ index }));
    },
    onClickRight: (e, index) => {
      dispatch(moveRightImage({ index }));
    },
  };

  return (
    <>
      <UploadImageView {...viewProps} />
      <ImagePreview />
    </>
  );
}
