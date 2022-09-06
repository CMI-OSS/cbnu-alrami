import { UnSubscription } from "@components/atoms/icon";
import $ from "src/page/Subscription/style.module.scss";

type Props = {
  boardTrees: res.BoardTrees[];
};

function Guide({ boardTrees }: Props) {
  const boardId = String(boardTrees[0].id);
  if (boardId.length === 1) {
    return (
      <div className={$.phrase}>
        어떤 공지를
        <br />
        받아볼까요?
      </div>
    );
  }
  if (boardId.length === 3 && boardId[0] === "1") {
    return (
      <div className={$.phrase}>
        재학중인 단과대학을
        <br />
        선택해주세요
      </div>
    );
  }
  if (boardId.length === 5 && boardId[0] === "1") {
    return (
      <div className={$.phrase}>
        재학중인 학과를
        <br />
        선택해주세요
      </div>
    );
  }
  if (boardId.length === 3 && boardId[0] === "2") {
    return (
      <div className={$.phrase}>
        어떤 기관의 공지를
        <br />
        받아볼까요?
      </div>
    );
  }
  if (boardId.length === 3 && boardId[0] === "3") {
    return (
      <div className={$.phrase}>
        어떤 학생회의 공지를
        <br />
        받아볼까요?
      </div>
    );
  }
  return (
    <div className={$.phrase}>
      <UnSubscription size={36} stroke="#aaaaaa" />
      를 터치하여
      <br />
      원하는 공지를 구독해요!
    </div>
  );
}

export default Guide;
