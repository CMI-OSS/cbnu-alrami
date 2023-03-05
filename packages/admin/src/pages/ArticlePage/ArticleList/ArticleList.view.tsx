/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { ResponseArticleDto } from "@shared/swagger-api/generated/models/ResponseArticleDto";
import classnames from "classnames";
import dayjs from "dayjs";

import $ from "./ArticleList.module.scss";

interface Props {
  articles: ResponseArticleDto[];
  onClickArticle: (articleId: number) => void;
}

export default function ArticleListView({ articles, onClickArticle }: Props) {
  return (
    <div className={$.table}>
      <div className={classnames($.row, $.header)}>
        <div className={classnames($.cell, $.id)}>ID</div>
        <div className={classnames($.cell, $.title)}>제목</div>
        <div className={classnames($.cell, $.id)}>조회수</div>
        <div className={classnames($.cell, $.scraps)}>북마크</div>
        <div className={classnames($.cell, $.date)}>작성</div>
        <div className={classnames($.cell, $.date)}>수정</div>
      </div>
      {articles.map((article) => (
        <div
          className={$.row}
          key={article.id}
          onClick={() => onClickArticle(article.id)}
        >
          <div className={classnames($.cell, $.id)}>{article.id}</div>
          <div className={classnames($.cell, $.title)}>{article.title}</div>

          <div className={classnames($.cell, $.hits)}>{article.viewCount}</div>
          <div className={classnames($.cell, $.scraps)}>
            {article.bookmarkCount}
          </div>
          <div className={classnames($.cell, $.date)}>
            {dayjs(article.dateTime).format("YYYY.MM.DD")}
          </div>
          <div className={classnames($.cell, $.date)}>
            {dayjs(article.updatedDateTime).format("YYYY.MM.DD HH:MM")}
          </div>
        </div>
      ))}
    </div>
  );
}
