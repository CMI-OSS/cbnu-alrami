/* eslint-disable react/no-array-index-key */
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  DragEvent,
  MouseEventHandler,
} from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoImagesOutline } from "react-icons/io5";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import classNames from "classnames";
import { useImgUploadMutation } from "src/api/board";
import { useAppDispatch } from "src/store";
import { writeBoard } from "src/store/boardSlice";
import { imgType } from "src/types";

import { LoadingSpinner, ToastMsg } from "../Atom";
import ImgCard from "./ImgCard";
import $ from "./style.module.scss";

interface Props {
  imgList: imgType[];
}

export default function ImgSlides({ imgList }: Props) {
  const dispatch = useAppDispatch();
  const idRef = useRef(-1);
  const dragRef = useRef<HTMLInputElement | null>(null);
  const [ isDragging, setIsDragging ] = useState<boolean>(false);
  const [ isFetched, setIsFetched ] = useState(false);
  const [ imgSrcList, setImgSrcList ] = useState<imgType[]>([]);
  const [ imgCurrentNo, setImgCurrentNo ] = useState(0);
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
        onChangeImg(imgCurrentNo + 1);
      } else if (mouseUpClientX > mouseDownClientX && dragSpace > 100) {
        onChangeImg(imgCurrentNo - 1);
      }
    }
  }, [ mouseUpClientX ]);

  useEffect(() => {
    if (isFetched) {
      setTimeout(() => setIsFetched(false), 1000);
    }
  }, [ isFetched ]);

  const handleDragIn = useCallback((e: DragEvent<HTMLInputElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent<HTMLInputElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLInputElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLInputElement>): void => {
      e.preventDefault();
      e.stopPropagation();

      onLoadDragFile(e);
      setIsDragging(false);
    },
    [ onLoadDragFile ],
  );

  // const initDragEvents = useCallback((): void => {
  //   if (dragRef.current) {
  //     dragRef.current.addEventListener("dragenter", handleDragIn);
  //     dragRef.current.addEventListener("dragleave", handleDragOut);
  //     dragRef.current.addEventListener("dragover", handleDragOver);
  //     dragRef.current.addEventListener("drop", handleDrop);
  //   }
  // }, [ handleDragIn, handleDragOut, handleDragOver, handleDrop ]);

  // const resetDragEvents = useCallback((): void => {
  //   if (dragRef.current) {
  //     dragRef.current.removeEventListener("dragenter", handleDragIn);
  //     dragRef.current.removeEventListener("dragleave", handleDragOut);
  //     dragRef.current.removeEventListener("dragover", handleDragOver);
  //     dragRef.current.removeEventListener("drop", handleDrop);
  //   }
  // }, [ handleDragIn, handleDragOut, handleDragOver, handleDrop ]);

  // useEffect(() => {
  //   initDragEvents();
  //   return () => resetDragEvents();
  // }, [ initDragEvents, resetDragEvents ]);

  const uploadFiles = async (files: FileList) => {
    const formData = new FormData();
    if (files) {
      console.log(files);
      const filesArr = Array.from(files);
      filesArr.forEach((file) => {
        formData.append("image", file);
      });

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

  // async function onLoadFile(e) {
  //   if (e.type === "drop") {
  //     const target = e.dataTransfer as DragEvent<HTMLInputElement>;
  //     uploadFiles(target.files);
  //   }
  //   if (e.type === "change") {
  //     const target = e.target as ChangeEvent<HTMLInputElement>;
  //     uploadFiles(target.files);
  //   }
  // }

  async function onLoadChangeFile(e: ChangeEvent<HTMLInputElement>) {
    console.log(e);
    const { files } = e.target;
    if (files) uploadFiles(files);
  }

  async function onLoadDragFile(e: DragEvent<HTMLInputElement>) {
    console.log(e);
    const { files } = e.dataTransfer;
    if (files) uploadFiles(files);
  }

  // async function onLoadButtonFile(
  //   e: MouseEventHandler<HTMLButtonElement>,
  // ): void {
  //   const { files } = e.target;
  //   if (files) uploadFiles(files);
  // }

  const onChangeImg = (index: number) => {
    let idx = index;
    if (imgList.length <= index) idx = 0;
    else if (index < 0) idx = imgList.length - 1;
    setImgCurrentNo(idx);
  };

  const onMouseDown = (num: number) => setMouseDownClientX(num);
  const onMouseUp = (num: number) => setMouseUpClientX(num);

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
                ${imgCurrentNo * -100.6}%`,
                }}
              >
                {imgList.map((img, idx) => (
                  <ImgCard key={`img-${img.src}-${idx}`} img={img} />
                ))}
              </ul>

              <button
                type="button"
                aria-label="이미지 추가하기"
                className={$["button-add"]}
                // onClick={onLoadButtonFile}
              >
                <AiOutlinePlus />
              </button>
              <button
                type="button"
                aria-label="이전 이미지 보기"
                className={$["button-prev"]}
                onClick={() => onChangeImg(imgCurrentNo - 1)}
              >
                <MdOutlineArrowBackIosNew />
              </button>
              <button
                type="button"
                aria-label="다음 이미지 보기"
                className={$["button-next"]}
                onClick={() => onChangeImg(imgCurrentNo + 1)}
              >
                <MdOutlineArrowForwardIos />
              </button>
            </>
          )}
        </div>
      ) : (
        <label
          htmlFor="chooseFile"
          className={classNames($["no-image"], { [$.isLoading]: isLoading })}
        >
          {isLoading ? (
            loadingSpinner
          ) : (
            <>
              <input
                ref={dragRef}
                id="chooseFile"
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                draggable
                style={{ display: "none" }}
                onChange={onLoadChangeFile}
                onDrag={(e) => onLoadDragFile(e)}
              />
              <IoImagesOutline />
              <span>이미지 업로드</span>
            </>
          )}
        </label>
      )}

      {isFetched && (
        <ToastMsg msg={`이미지 업로드 ${isSuccess ? "성공" : "실패"}`} />
      )}
    </article>
  );
}
