import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { FillHeart, Heart, LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import {
  useArticleQuery,
  useDeleteLikeArticleMutation,
  usePostLikeArticleMutation,
} from "@hooks/api/article";
import classnames from "classnames";
import dayjs from "dayjs";
import ArticleFooter from "src/page/Article/components/Footer";
import { getUuid } from "src/utils/storage";

import $ from "./style.module.scss";

function ArticleDetail() {
  const { pathname } = useLocation();
  const articleId = Number(pathname.split("/").at(-1));
  const [ isLikeClick, setIsLikeClick ] = useState(false);
  const [ imageOrder, setImageOrder ] = useState(0);
  const { data: articleData, isLoading } = useArticleQuery({ id: articleId });
  const postLikeArticle = usePostLikeArticleMutation({ id: articleId });
  const deleteLikeArticle = useDeleteLikeArticleMutation({ id: articleId });

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
    images,
  } = articleData;

  const handleToggleLikeClick = (articleId: number) => {
    if (isLike) {
      setIsLikeClick(false);
      deleteLikeArticle.mutate({ id: articleId });
      return;
    }
    setIsLikeClick(true);
    postLikeArticle.mutate({ id: articleId });
  };

  const isScraperArticle = `${id}`[0] === ("1" || "2");
  const isUser = !!getUuid();

  console.log(images, imageOrder);

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
          {!!images?.length && (
            <div className={$["image-wrapper"]}>
              <div className={$.images}>
                <div className={$.order}>
                  {imageOrder}/{images.length}
                </div>
                {images.map((image) => {
                  const { id, url } = image;
                  return <img key={id} src={url} alt="이미지" />;
                })}
              </div>
              <div className={$.dots}>
                {images.map((image, idx) => {
                  return (
                    <div
                      key={image.id}
                      className={$.dot}
                      style={{
                        background: imageOrder === idx ? "#d66d6e" : "#c3c3c3",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
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
