import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Heart, LeftArrow } from "@components/atoms/icon";
import { FillHeart } from "@components/atoms/icon/FillHeart";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import {
  useArticleQuery,
  useDeleteLikeArticleMutation,
  usePostLikeArticleMutation,
} from "@hooks/api/article1";
import classnames from "classnames";
import dayjs from "dayjs";
import ArticleFooter from "src/page/Article/components/Footer";

import $ from "./style.module.scss";

function ArticleDetail() {
  const { pathname } = useLocation();
  const articleId = Number(pathname.split("/").at(-1));
  const [ isLikeClick, setIsLikeClick ] = useState(false);
  const { data: articleData, isLoading } = useArticleQuery({
    id: articleId,
    uuid: "1111",
  });

  const postLikeArticle = usePostLikeArticleMutation({
    id: articleId,
    uuid: "1111",
  });

  const deleteLikeArticle = useDeleteLikeArticleMutation({
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
    isLike,
    likeCount,
  } = articleData;

  const handleToggleLikeClick = (articleId: number) => {
    if (isLike) {
      setIsLikeClick(false);
      deleteLikeArticle.mutate({ id: articleId, uuid: "1111" });
      return;
    }
    setIsLikeClick(true);
    postLikeArticle.mutate({ id: articleId, uuid: "1111" });
  };

  const isScraperArticle = `${id}`[0] === ("1" || "2");
  // TODO: uuid 로직 추가
  const isUser = true;

  return (
    <div className={$["article-detail"]}>
      <FullPageModalTemplate
        left={<LeftArrow stroke="#AAAAAA" size={16} />}
        title={name}
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
          <div className={$.heart}>
            <button
              type="button"
              className={$["heart-button"]}
              onClick={() => {
                return handleToggleLikeClick(articleId);
              }}
            >
              {isLike ? (
                <div className={classnames(isLikeClick && $.active)}>
                  <FillHeart size={20} fill="#D66D6E" />
                </div>
              ) : (
                <div>
                  <Heart size={20} stroke="#AAAAAA" />
                </div>
              )}
              {likeCount}
            </button>
          </div>
        </div>

        <ArticleFooter
          {...{ articleId, isBookmark, isUser, isScraperArticle }}
        />
      </FullPageModalTemplate>
    </div>
  );
}

export default ArticleDetail;
