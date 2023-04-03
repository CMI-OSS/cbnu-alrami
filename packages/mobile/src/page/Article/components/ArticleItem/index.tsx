import React from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import { EMPTY_TITLE_GUIDE_MESSAGE } from "src/constants";
import { setRecentBoardId } from "src/utils/storage";

import $ from "./style.module.scss";

type Props = {
  id: number;
  boardId: number;
  boardName: string;
  title: string;
  dateTime: string;
  viewCount: number;
  likeCount: number;
};

function ArticleItem({
  id,
  boardId,
  boardName,
  title,
  dateTime,
  viewCount,
  likeCount,
}: Props) {
  return (
    <Link
      className={$["article-item"]}
      to={`/article/detail/${id}`}
      onClick={() => {
        return setRecentBoardId(boardId);
      }}
    >
      <div className={$["board-name"]}>{boardName}</div>
      <div className={$.title}>{title || EMPTY_TITLE_GUIDE_MESSAGE}</div>
      <div className={$.info}>
        <span>{dayjs(dateTime).format("YYYY-MM-DD")}</span>&nbsp;/&nbsp;
        <span>조회수&nbsp;{viewCount}</span>
        &nbsp;/&nbsp;<span>좋아요&nbsp;{likeCount}</span>
      </div>
    </Link>
  );
}

export default ArticleItem;
