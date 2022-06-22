/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import { useState, useEffect, useRef, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoImagesOutline } from "react-icons/io5";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import classNames from "classnames";
import { imgListMocks } from "src/__mockData__";
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
  const { currentImgIdx } = useAppSelector(
    (state) => state.boardReducer.board.write,
  );
  const idRef = useRef(-1);
  const [ isFetched, setIsFetched ] = useState(false);
  const [ imgSrcList, setImgSrcList ] = useState<imgType[]>([]);
  const [ mouseDownClientX, setMouseDownClientX ] = useState<number>(0);
  const [ mouseUpClientX, setMouseUpClientX ] = useState<number>(0);
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
      setTimeout(() => setIsFetched(false), 1000);
    }
  }, [ isFetched ]);

  const uploadFiles = async (files: FileList) => {
    const formData = new FormData();
    if (files) {
      const filesArr = Array.from(files);
      filesArr.forEach((file) => {
        formData.append("image", file);
      });

      // const res = [ ...imgListMocks ]; // 서버 통신이 안돼서 mock데이터로 테스트
      // const data = res.map((src) => ({
      //   id: idRef.current++,
      //   src,
      // }));
      // setIsFetched(true);
      // setImgSrcList([ ...imgSrcList, ...data ]);
      // dispatch(writeBoard({ boardImgList: [ ...imgSrcList, ...data ] }));

      try {
        const res = await imgUpload(formData).unwrap();
        const data = res.map((src) => {
          idRef.current += 1;
          return {
            id: idRef.current + 1,
            src,
          };
        });
        setIsFetched(true);
        setImgSrcList([ ...imgSrcList, ...data ]);
        dispatch(writeBoard({ boardImgList: [ ...imgSrcList, ...data ] }));
      } catch (e) {
        console.log(e);
      } finally {
        setIsFetched(true);
      }
    }
  };

  function onLoadFile(e: React.ChangeEvent | React.DragEvent) {
    if (e.type === "drop") {
      const { dataTransfer } = e as React.DragEvent<HTMLInputElement>;
      uploadFiles(dataTransfer.files);
    }
    if (e.type === "change") {
      const { target } = e as React.ChangeEvent<HTMLInputElement>;
      if (target.files) uploadFiles(target.files);
    }
  }

  const onMouseDown = (num: number) => setMouseDownClientX(num);
  const onMouseUp = (num: number) => setMouseUpClientX(num);

  const handleDragInOutOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onLoadFile(e);
    },
    [ onLoadFile ],
  );

  return (
    <article className={$["img-slides"]}>
      {imgList.length ? (
        <div className={$["img-list-box"]} role="presentation">
          {isLoading ? (
            loadingSpinner
          ) : (
            <>
              <ul
                onMouseDown={(e: React.MouseEvent) => onMouseDown(e.clientX)}
                onMouseUp={(e: React.MouseEvent) => onMouseUp(e.clientX)}
                role="presentation"
                style={{
                  transform: `translateX(
                ${currentImgIdx * -100.6}%`,
                }}
              >
                {imgList.map((img, idx) => (
                  <ImgCard key={`img-${img.src}-${idx}`} img={img} />
                ))}
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
                onClick={() => dispatch(changeCurrentImg(currentImgIdx - 1))}
              >
                <MdOutlineArrowBackIosNew />
              </button>
              <button
                type="button"
                aria-label="다음 이미지 보기"
                className={$["button-next"]}
                onClick={() => dispatch(changeCurrentImg(currentImgIdx + 1))}
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
