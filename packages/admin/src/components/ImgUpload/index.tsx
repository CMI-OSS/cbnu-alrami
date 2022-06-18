/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { imgListMocks } from "src/__mockData__";
import { useImgUploadMutation } from "src/api/board";
import { useAppDispatch } from "src/store";
import { writeBoard } from "src/store/boardSlice";
import { imgType } from "src/types";

import { LoadingSpinner, ToastMsg } from "../Atom";
import $ from "./style.module.scss";

export default function ImgUpload() {
  const dispatch = useAppDispatch();
  const idRef = useRef(0);
  const [ isFetched, setIsFetched ] = useState(false);
  const [ imgSrcList, setImgSrcList ] = useState<imgType[]>([]);
  const [ imgUpload, { isLoading, isSuccess } ] = useImgUploadMutation();

  useEffect(() => {
    if (isFetched) {
      setTimeout(() => setIsFetched(false), 1000);
    }
  }, [ isFetched ]);

  const onLoadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const formData = new FormData();
    if (files) {
      const filesArr = Array.from(files);
      filesArr.forEach((file) => {
        formData.append("image", file);
      });

      // const res = [ ...imgListMocks ];
      // const data = res.map((src) => ({
      //   id: idRef.current++,
      //   src,
      // }));
      // setIsFetched(true);
      // setImgSrcList([ ...imgSrcList, ...data ]);
      // dispatch(writeBoard({ boardImgList: [ ...imgSrcList, ...data ] }));
      try {
        const res = await imgUpload(formData).unwrap();
        const data = res.map((src) => ({
          id: idRef.current++,
          src,
        }));
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

  return (
    <>
      <label
        htmlFor="chooseFile"
        className={classNames($["file-label"], { [$.isLoading]: isLoading })}
      >
        {isLoading ? (
          <LoadingSpinner width={1.27} borderWidth={0.14} color="#fff" />
        ) : (
          <>
            <input
              style={{ display: "none" }}
              id="chooseFile"
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={onLoadFile}
            />
            이미지 업로드
          </>
        )}
      </label>

      {isFetched && (
        <ToastMsg msg={`이미지 업로드 ${isSuccess ? "성공" : "실패"}`} />
      )}
    </>
  );
}
