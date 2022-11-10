/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import classnames from "classnames";
import dayjs from "dayjs";
import { Article } from "src/api/types";

import $ from "./PlaceList.module.scss";

interface Props {
  articles: Article[];
  onClickArticle: (articleId: number) => void;
}

export default function PlaceListView({ articles, onClickArticle }: Props) {
  return (
    <div className={$.table}>
      <div className={classnames($.row, $.header)}>
        <div className={classnames($.cell, $.id)}>ID</div>
        <div className={classnames($.cell, $.title)}>제목</div>
        <div className={classnames($.cell, $.date)}>작성일</div>
        <div className={classnames($.cell, $.id)}>조회수</div>
        <div className={classnames($.cell, $.scraps)}>스크랩</div>
        <div className={classnames($.cell, $.id)}>수정일</div>
      </div>
      {articles.map((article) => (
        <div
          className={$.row}
          key={article.id}
          onClick={() => onClickArticle(article.id)}
        >
          <div className={classnames($.cell, $.id)}>{article.id}</div>
          <div className={classnames($.cell, $.title)}>{article.title}</div>

          <div className={classnames($.cell, $.date)}>
            {dayjs(article.date).format("YYYY.MM.DD")}
          </div>
          <div className={classnames($.cell, $.hits)}>{article.hits}</div>
          <div className={classnames($.cell, $.scraps)}>{article.scraps}</div>
          <div className={classnames($.cell, $.date)}>
            {dayjs(article.updatedAt).format("YYYY.MM.DD HH:MM")}
          </div>
        </div>
      ))}
    </div>
  );
}
