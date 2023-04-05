import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useBoardsQuery } from "@hooks/api/board";

import $ from "./style.module.scss";

const getName = (boardsData: any, boardId: number): any => {
  let children;
  // eslint-disable-next-line no-restricted-syntax
  for (const boardData of boardsData) {
    if (boardData.id === boardId) return boardData;
    children = children || getName(boardData.children, boardId);
    if (children) return children;
  }
  return children;
};

function BreadCrumb() {
  const { pathname } = useLocation();
  const boardIds = pathname
    .split("/")
    .slice(2)
    .map((boardId) => {
      return Number(boardId);
    });
  const { data: boardsData } = useBoardsQuery();
  const [ breadcrumb, setBreadcrumb ] = useState<string>();

  useEffect(() => {
    if (boardIds.length === 0 || !boardsData?.length) {
      setBreadcrumb("전체");
      return;
    }
    const names = [ "전체" ];
    for (let i = 0; i < boardIds.length; i += 1) {
      const name = getName(boardsData, boardIds[i])?.name;
      if (name) {
        names.push(name);
      }
    }
    setBreadcrumb(names.join(" > "));
  }, [ boardIds ]);
  return <div className={$.breadcrumb}>{breadcrumb}</div>;
}

export default BreadCrumb;
