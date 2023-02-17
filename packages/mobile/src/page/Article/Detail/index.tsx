import React from "react";
import { useLocation } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useArticleQuery } from "@hooks/api/article1";
import dayjs from "dayjs";
import ArticleFooter from "src/page/Article/components/Footer";

import $ from "./style.module.scss";

function ArticleDetail() {
  const { pathname } = useLocation();
  const articleId = Number(pathname.split("/").at(-1));
  const { data: articleData, isLoading } = useArticleQuery({
    id: articleId,
    uuid: "1111",
  });

  if (isLoading) return <></>;
  if (!articleData) return <>데이터가 없습니다.</>;

  const {
    board: { id, name },
    title,
    viewCount,
    bookmarkCount,
    createdDateTime,
    content,
    isBookmark,
  } = articleData;

  const isScraperArticle = `${id}`[0] === ("1" || "2");
  // TODO: uuid 로직 추가
  const isUser = true;

  return (
    <div className={$["article-detail"]}>
      <FullPageModalTemplate
        left={<LeftArrow stroke="#AAAAAA" size={16} />}
        title={name}
        right={
          <button className={$.report} type="button">
            제보하기
          </button>
        }
      >
        <div className={$.children}>
          <div className={$.title}>{title}</div>
          <div className={$.info}>
            <span>{dayjs(createdDateTime).format("YYYY-MM-DD")}</span>
            &nbsp;/&nbsp;
            <span>조회수&nbsp;{viewCount}</span>
            &nbsp;/&nbsp;<span>좋아요&nbsp;{bookmarkCount}</span>
          </div>
          <div
            className={$.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <ArticleFooter
          {...{ articleId, isBookmark, isUser, isScraperArticle }}
        />
      </FullPageModalTemplate>
    </div>
  );
}

export default ArticleDetail;
