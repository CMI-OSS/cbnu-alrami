import { useEffect, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "src/store";
import { writeBoard } from "src/store/boardSlice";

import $ from "./style.module.scss";

interface Props {
  img: {
    id: number;
    src: string;
  };
}

export default function ImgCard({ img: { id, src } }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dispatch = useAppDispatch();
  const { boardImgList } = useAppSelector(
    (state) => state.boardReducer.board.write,
  );

  // useEffect(() => {
  //   // 버그
  //   const curImgRef = imgRef.current;
  //   if (curImgRef) {
  //     if (curImgRef.clientHeight > curImgRef.clientWidth) {
  //       curImgRef.style.height = "100%";
  //     } else curImgRef.style.width = "100%";
  //   }
  // }, []);

  return (
    <li className={$["img-card"]}>
      <div className={$["img-wrapper"]}>
        <img alt="업로드할 이미지" src={src} ref={imgRef} />
      </div>
      <button
        type="button"
        aria-label="이미지 삭제하기"
        className={$["button-delete"]}
        onClick={() =>
          dispatch(
            writeBoard({
              boardImgList: boardImgList.filter(({ id: x }) => x !== id),
            }),
          )
        }
      >
        <MdOutlineClose />
      </button>
    </li>
  );
}
