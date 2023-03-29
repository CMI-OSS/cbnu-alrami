import { useState } from "react";
import { useLocation } from "react-router-dom";

import { FillHeart, Heart, LeftArrow } from "@components/atoms/icon";
import SwiperImage from "@components/molecules/SwiperImage";
import ImageModal from "@components/shared/ImageModal";
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
  const [ order, setOrder ] = useState(1);
  const { data: articleData, isLoading } = useArticleQuery({ id: articleId });
  const postLikeArticle = usePostLikeArticleMutation({ id: articleId });
  const deleteLikeArticle = useDeleteLikeArticleMutation({ id: articleId });
  const [ enlargeModal, setEnlargeModal ] = useState(false);

  if (isLoading) return <></>;
  if (!articleData) return <>데이터가 없습니다.</>;

  const {
    board: { name },
    title,
    viewCount,
    createdDateTime,
    content,
    isBookmark,
    isLike,
    likeCount,
    images,
    url,
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

  const isUser = !!getUuid();

  return (
    <div className={$["article-detail"]}>
      <FullPageModalTemplate
        left={isUser ? <LeftArrow stroke="#5e5e5e" size={16} /> : <></>}
        title={name}
      >
        <div className={$.children}>
          <div className={$.title}>{title}</div>
          <div className={$.info}>
            <span>{dayjs(createdDateTime).format("YYYY-MM-DD")}</span>
            &nbsp;/&nbsp;
            <span>조회수&nbsp;{viewCount}</span>
            &nbsp;/&nbsp;<span>좋아요&nbsp;{likeCount}</span>
          </div>
          {!!images?.length && (
            <SwiperImage
              imageDatas={images.map((image) => {
                return image.url;
              })}
              onOpen={() => {
                return setEnlargeModal(true);
              }}
              {...{ order, setOrder }}
            />
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
        <ArticleFooter {...{ articleId, isBookmark, isUser, url }} />
      </FullPageModalTemplate>
      {enlargeModal && images?.length && (
        <ImageModal
          {...{ order, setOrder, images }}
          onClose={() => {
            return setEnlargeModal(false);
          }}
        />
      )}
    </div>
  );
}

export default ArticleDetail;
