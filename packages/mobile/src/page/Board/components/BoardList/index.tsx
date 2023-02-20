/* eslint-disable no-loop-func */
import { useLocation } from "react-router-dom";

import { useBoardsQuery, useSubscribeBoardsQuery } from "@hooks/api/board";
import { ChildBoard, ResponseBoardDto } from "@shared/swagger-api/generated";
import classnames from "classnames";
import BoardItem from "src/page/Board/components/BoardItem";
import { getBoardKind } from "src/page/Board/components/Title";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

function BoardList({ className }: DefaultProps) {
  const { data: boardsData } = useBoardsQuery({ uuid: "1111" });
  const { data: subscribeBoardsData } = useSubscribeBoardsQuery({
    uuid: "1111",
  });

  const { kind } = getBoardKind();

  if (!boardsData) return <></>;

  let boardChildrensData: ResponseBoardDto[] | ChildBoard[] = boardsData;
  let pathnames = useLocation()
    .pathname.split("/")
    .filter((path) => {
      return path !== "";
    })
    .slice(1);

  while (pathnames.length) {
    boardChildrensData =
      boardChildrensData.find((boardData) => {
        return boardData?.id === Number(pathnames[0]);
      })?.children || [];
    pathnames = pathnames.slice(1);
  }

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
      {boardChildrensData?.map((boardChildren) => {
        const { id, name, children } = boardChildren;
        const isLast = children?.length === 0;
        const subscribeboard = subscribeBoardsData?.find(
          (subscribeBoardData) => {
            return subscribeBoardData.id === id;
          },
        );
        return (
          <BoardItem
            key={id}
            id={id}
            title={name}
            isLast={isLast}
            isNotice={subscribeboard?.isNotice ?? false}
            isSubscribe={subscribeboard?.isSubscribe ?? false}
          />
        );
      })}
    </div>
  );
}

export default BoardList;
