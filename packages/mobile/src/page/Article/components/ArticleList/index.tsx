import { useLocation } from "react-router-dom";

import {
  useBookmarkArticlesQuery,
  usePopularArticlesQuery,
  useSubscribeArticlesQuery,
} from "@hooks/api/article1";
import { useBoardArticlesQuery } from "@hooks/api/board1";
import { useIntersect } from "@hooks/UseIntersect";
import ArticleItem from "src/page/Article/components/ArticleItem";

import $ from "./style.module.scss";

const useArticles = () => {
  const { pathname } = useLocation();
  const kind = pathname.split("/").at(-1);
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

function ArticleList() {
  const {
    data: articlesData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useArticles();

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  return (
    <div className={$["article-list"]}>
      {articlesData?.pages[0].articles.map((articleData) => {
        const {
          id,
          title,
          createdDateTime,
          bookmarkCount,
          viewCount,
          board: { name, parent },
        } = articleData;
        const boardName = parent?.name ? `${parent.name} > ${name}` : name;
        return (
          <ArticleItem
            key={id}
            {...{
              id,
              title,
              createdDateTime,
              viewCount,
              bookmarkCount,
              boardName,
            }}
          />
        );
      })}
      <div ref={ref} />
    </div>
  );
}

export default ArticleList;
