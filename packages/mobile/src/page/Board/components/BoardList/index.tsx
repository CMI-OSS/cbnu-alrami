import { useBoardQuery } from "@hooks/api/board1";
import classnames from "classnames";
import BoardItem from "src/page/Board/components/BoardItem";
import { getBoardKind } from "src/page/Board/components/Title";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

function BoardList({ className }: DefaultProps) {
  const { data: boardsData } = useBoardQuery({ uuid: "1111" });
  const { id, kind } = getBoardKind();
  if (!boardsData) return <></>;
  const childrensData = boardsData.find((boardData) => {
    return boardData.id === id;
  })?.children;

  if (kind === "전체") {
    return (
      <div className={classnames($["board-list"], className)}>
        <BoardItem
          id={boardsData[0].id}
          title={boardsData[0].name}
          content="전공 별 공지사항을 확인해요"
        />
        <BoardItem
          id={boardsData[1].id}
          title={boardsData[1].name}
          content="충북대학교의 다양한 공지사항을 확인해요"
        />
        <BoardItem
          id={boardsData[2].id}
          title={boardsData[2].name}
          content="학생회의 공지를 받아볼 수 있어요"
        />
      </div>
    );
  }

  return (
    <div className={$["board-list"]}>
      {childrensData?.map((childrenData) => {
        const { id, name } = childrenData;
        return <BoardItem key={id} id={id} title={name} />;
      })}
    </div>
  );
}

export default BoardList;
