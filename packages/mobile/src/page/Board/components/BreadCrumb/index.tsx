import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useBoardsQuery } from "@hooks/api/board";

import $ from "./style.module.scss";

const getChildren = (boardsData: any, boardId: number): any => {
  let children;
  // eslint-disable-next-line no-restricted-syntax
  for (const boardData of boardsData) {
    if (boardData.id === boardId) return boardData;
    children = children || getChildren(boardData.children, boardId);
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
  const INIT_BREADCRUMB = { path: "/board", name: "전체" };
  const [ breadcrumbs, setBreadcrumbs ] = useState<
    { path: string; name: string }[]
  >([ INIT_BREADCRUMB ]);

  useEffect(() => {
    const newBreadcrumbs = [ INIT_BREADCRUMB ];

    for (let i = 0; i < boardIds.length; i += 1) {
      const id = getChildren(boardsData, boardIds[i])?.id;
      const name = getChildren(boardsData, boardIds[i])?.name;
      const { path } = newBreadcrumbs.at(-1)!;
      newBreadcrumbs.push({ path: `${path}/${id}`, name });
    }

    setBreadcrumbs(newBreadcrumbs);
  }, [ boardIds.length, boardsData?.length ]);

  return (
    <div className={$.breadcrumb}>
      {breadcrumbs.map(({ name, path }) => {
        return (
          <div key={path} className={$["breadcrumb-item"]}>
            <Link to={`${path}`}>{name}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default BreadCrumb;
