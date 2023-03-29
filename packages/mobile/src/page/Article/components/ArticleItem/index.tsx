import React from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

import $ from "./style.module.scss";

type Props = {
  id: number;
  boardName: string;
  title: string;
  createdDateTime: string;
  viewCount: number;
  likeCount: number;
};

function ArticleItem({
  id,
  boardName,
  title,
  createdDateTime,
  viewCount,
  likeCount,
}: Props) {
  return (
    <Link className={$["article-item"]} to={`/article/detail/${id}`}>
      <div className={$["board-name"]}>{boardName}</div>
      <div className={$.title}>{title}</div>
      <div className={$.info}>
        <span>{dayjs(createdDateTime).format("YYYY-MM-DD")}</span>&nbsp;/&nbsp;
        <span>조회수&nbsp;{viewCount}</span>
        &nbsp;/&nbsp;<span>좋아요&nbsp;{likeCount}</span>
      </div>
    </Link>
  );
}

export default ArticleItem;
