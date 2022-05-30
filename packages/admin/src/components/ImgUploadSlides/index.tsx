/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoImagesOutline } from "react-icons/io5";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import { imgType } from "src/types";

import ImgCard from "./ImgCard";
import $ from "./style.module.scss";

interface Props {
  imgList: imgType[];
}

export default function ImgSlides({ imgList }: Props) {
  const [ imgCurrentNo, setImgCurrentNo ] = useState(0);
  const [ mouseDownClientX, setMouseDownClientX ] = useState<number>(0);
  const [ mouseUpClientX, setMouseUpClientX ] = useState<number>(0);

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
        <div className={$["img-list-box"]}>
          <ul
            onMouseDown={(e: React.MouseEvent) => onMouseDown(e.clientX)}
            onMouseUp={(e: React.MouseEvent) => onMouseUp(e.clientX)}
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
            onClick={() => onChangeImg(imgCurrentNo - 1)}
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
        </div>
      ) : (
        <div className={$["no-image"]}>
          <IoImagesOutline />
          <span>이미지 업로드</span>
        </div>
      )}
    </article>
  );
}
