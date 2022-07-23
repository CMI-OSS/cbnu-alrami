import { MdOutlineClose } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "src/store";
import { changeCurrentImg, writeBoard } from "src/store/boardSlice";

import $ from "./style.module.scss";

interface Props {
  data: {
    id: number;
    url: string;
  };
}

export default function ImgCard({ data: { id, url } }: Props) {
  const dispatch = useAppDispatch();
  const { boardImgList, currentImgIdx } = useAppSelector(
    (state) => state.boardReducer.board.write,
  );

  return (
    <li className={$["img-card"]}>
      <div className={$["img-wrapper"]}>
        <img alt="업로드할 이미지" src={url} />
      </div>
      <button
        type="button"
        aria-label="이미지 삭제하기"
        className={$["button-delete"]}
        onClick={() => {
          dispatch(
            writeBoard({
              boardImgList: boardImgList.filter(({ id: x }) => x !== id),
            }),
          );
          dispatch(changeCurrentImg(currentImgIdx - 1));
        }}
      >
        <MdOutlineClose />
      </button>
    </li>
  );
}
