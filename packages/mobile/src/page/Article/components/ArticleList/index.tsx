import { useLocation } from "react-router-dom";

import {
  useBookmarkArticlesQuery,
  usePopularArticlesQuery,
  useSubscribeArticlesQuery,
} from "@hooks/api/article";
import { useBoardArticlesQuery } from "@hooks/api/board";
import { useIntersect } from "@hooks/UseIntersect";
import classnames from "classnames";
import guideEmptyArticle from "src/assets/guide_empty_article.png";
import guideEmptyBookmark from "src/assets/guide_empty_bookmark.png";
import guideEmptySubscription from "src/assets/guide_empty_subscription.png";
import ArticleItem from "src/page/Article/components/ArticleItem";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

const useArticles = ({ kind }: { kind: string }) => {
  if (kind === "popular") {
    return usePopularArticlesQuery();
  }

  if (kind === "subscribe") {
    return useSubscribeArticlesQuery();
  }

  if (kind === "bookmark") {
    return useBookmarkArticlesQuery();
  }

  return useBoardArticlesQuery({ id: Number(kind) });
};

function ArticleList({ className }: DefaultProps) {
  const { pathname } = useLocation();
  const kind = pathname.split("/").at(-1) || "";

  const {
    data: articlesData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useArticles({ kind });

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  const isArticleEmpty =
    !articlesData?.pages[0]?.articles ||
    articlesData?.pages[0].pagination.totalItemCount === 0;

  if (isArticleEmpty && kind === "subscribe") {
    return (
      <div className={classnames($["empty-article-list"], className)}>
        <img
          width={266}
          src={guideEmptySubscription}
          alt="구독중인 공지사항 없음"
        />
      </div>
    );
  }

  if (isArticleEmpty && kind === "bookmark") {
    return (
      <div className={classnames($["empty-article-list"], className)}>
        <img
          width={247}
          src={guideEmptyBookmark}
          alt="북마크된 공지사항 없음"
        />
      </div>
    );
  }

  if (isArticleEmpty) {
    return (
      <div className={classnames($["empty-article-list"], className)}>
        <img
          width={248}
          src={guideEmptyArticle}
          alt="업데이트된 공지사항 없음"
        />
      </div>
    );
  }

  return (
    <div className={classnames($["article-list"], className)}>
      {articlesData?.pages.map((articlesData) => {
        return articlesData.articles.map((article) => {
          const {
            id,
            title,
            dateTime,
            likeCount,
            viewCount,
            board: { id: boardId, name, parent },
          } = article;
          const boardName = parent?.name ? `${parent.name} > ${name}` : name;
          return (
            <ArticleItem
              key={id}
              {...{
                id,
                boardId,
                title,
                dateTime,
                viewCount,
                likeCount,
                boardName,
              }}
            />
          );
        });
      })}
      <div ref={ref} />
    </div>
  );
}

export default ArticleList;
