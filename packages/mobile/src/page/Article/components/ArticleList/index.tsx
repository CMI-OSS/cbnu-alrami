import { useLocation } from "react-router-dom";

import {
  useBookmarkArticlesQuery,
  usePopularArticlesQuery,
  useSubscribeArticlesQuery,
} from "@hooks/api/article";
import { useBoardArticlesQuery } from "@hooks/api/board";
import { useIntersect } from "@hooks/UseIntersect";
import classnames from "classnames";
import ArticleItem from "src/page/Article/components/ArticleItem";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

const useArticles = () => {
  const { pathname } = useLocation();
  const kind = pathname.split("/").at(-1);
  if (kind === "popular") {
    return usePopularArticlesQuery();
  }

  if (kind === "subscribe") {
    return useSubscribeArticlesQuery({ uuid: "1111" });
  }

  if (kind === "bookmark") {
    return useBookmarkArticlesQuery({ uuid: "1111" });
  }

  return useBoardArticlesQuery({ id: Number(kind) });
};

function ArticleList({ className }: DefaultProps) {
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
    <div className={classnames($["article-list"], className)}>
      {articlesData?.pages.map((articlesData) => {
        return articlesData.articles.map((article) => {
          const {
            id,
            title,
            createdDateTime,
            bookmarkCount,
            viewCount,
            board: { name, parent },
          } = article;
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
        });
      })}
      <div ref={ref} />
    </div>
  );
}

export default ArticleList;
