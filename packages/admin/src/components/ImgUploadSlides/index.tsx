/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import { useState, useEffect, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoImagesOutline } from "react-icons/io5";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import classNames from "classnames";
import { useImgUploadMutation } from "src/api/board";
import { useAppDispatch, useAppSelector } from "src/store";
import { writeBoard, changeCurrentImg } from "src/store/boardSlice";
import { imgType } from "src/types";

import { LoadingSpinner, ToastMsg } from "../Atom";
import ImgCard from "./ImgCard";
import $ from "./style.module.scss";

interface Props {
  imgList: imgType[];
}

export default function ImgSlides({ imgList }: Props) {
  const dispatch = useAppDispatch();
  const { boardImgList, currentImgIdx } = useAppSelector((state) => {
    return state.boardReducer.board.write;
  });
  const [ isFetched, setIsFetched ] = useState(false);
  const [ mouseDownClientX, setMouseDownClientX ] = useState(0);
  const [ mouseUpClientX, setMouseUpClientX ] = useState(0);
  const [ imgUpload, { isLoading, isSuccess } ] = useImgUploadMutation();
  const loadingSpinner = (
    <LoadingSpinner width={5} borderWidth={0.3} color="#000" />
  );

  useEffect(() => {
    const dragSpace = Math.abs(mouseDownClientX - mouseUpClientX);

    if (mouseDownClientX !== 0) {
      if (mouseUpClientX < mouseDownClientX && dragSpace > 100) {
        dispatch(changeCurrentImg(currentImgIdx + 1));
      } else if (mouseUpClientX > mouseDownClientX && dragSpace > 100) {
        dispatch(changeCurrentImg(currentImgIdx - 1));
      }
    }
  }, [ mouseUpClientX ]);

  useEffect(() => {
    if (isFetched) {
      setTimeout(() => {
        return setIsFetched(false);
      }, 1000);
    }
  }, [ isFetched ]);

  const uploadFiles = async (files: FileList) => {
    const formData = new FormData();
    if (files) {
      const filesArr = Array.from(files);
      filesArr.forEach((file: File) => {
        formData.append("image", file);
      });

      try {
        const data = await imgUpload(formData).unwrap();
        setIsFetched(true);
        dispatch(writeBoard({ boardImgList: [ ...boardImgList, ...data ] }));
      } catch (e) {
        console.log(e);
      } finally {
        setIsFetched(true);
      }
    }
  };

  function onLoadFile(e: React.ChangeEvent | React.DragEvent) {
    if (e.type === "drop" && "dataTransfer" in e) {
      const { dataTransfer } = e;
      uploadFiles(dataTransfer.files);
    }
    if (e.type === "change" && "files" in e.target) {
      const {
        target: { files },
      } = e;
      if (files) uploadFiles(files);
    }
  }

  const onMouseDown = (num: number) => {
    return setMouseDownClientX(num);
  };
  const onMouseUp = (num: number) => {
    return setMouseUpClientX(num);
  };

  const doPreventEvent = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragInOutOver = useCallback((e: React.DragEvent) => {
    doPreventEvent(e);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      doPreventEvent(e);
      onLoadFile(e);
    },
    [ onLoadFile ],
  );

  return (
    <article className={$["img-slides"]}>
      {imgList.length ? (
        <div className={$["img-list-box"]}>
          {isLoading ? (
            loadingSpinner
          ) : (
            <>
              <ul
                onMouseDown={(e: React.MouseEvent) => {
                  return onMouseDown(e.clientX);
                }}
                onMouseUp={(e: React.MouseEvent) => {
                  return onMouseUp(e.clientX);
                }}
                role="presentation"
                className={$["img-lists"]}
                style={{
                  transform: `translateX(
                ${currentImgIdx * -100.6}%`,
                }}
              >
                {imgList.map((img, idx) => {
                  return <ImgCard key={`img-${img.url}-${idx}`} data={img} />;
                })}
              </ul>

              <label htmlFor="plusFile" className={$["button-add"]}>
                <AiOutlinePlus />
                <input
                  id="plusFile"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  style={{ display: "none" }}
                  onChange={onLoadFile}
                />
              </label>

              <button
                type="button"
                aria-label="이전 이미지 보기"
                className={$["button-prev"]}
                onClick={() => {
                  return dispatch(changeCurrentImg(currentImgIdx - 1));
                }}
              >
                <MdOutlineArrowBackIosNew />
              </button>
              <button
                type="button"
                aria-label="다음 이미지 보기"
                className={$["button-next"]}
                onClick={() => {
                  return dispatch(changeCurrentImg(currentImgIdx + 1));
                }}
              >
                <MdOutlineArrowForwardIos />
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <label
            htmlFor="chooseFile"
            className={classNames($["no-image"], { [$.isLoading]: isLoading })}
            onDragEnter={handleDragInOutOver}
            onDragOver={handleDragInOutOver}
            onDragLeave={handleDragInOutOver}
            onDrop={handleDrop}
          >
            {isLoading ? (
              loadingSpinner
            ) : (
              <>
                <IoImagesOutline />
                <span>이미지 업로드</span>
                <input
                  id="chooseFile"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  draggable
                  style={{ display: "none" }}
                  onChange={onLoadFile}
                />
              </>
            )}
          </label>
        </>
      )}

      {isFetched && (
        <ToastMsg msg={`이미지 업로드 ${isSuccess ? "성공" : "실패"}`} />
      )}
    </article>
  );
}
