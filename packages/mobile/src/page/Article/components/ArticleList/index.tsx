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
  return useBoardArticlesQuery({ id: 1010101 });
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

  console.log(articlesData, "데이터임니다");

  return (
    <div className={$["article-list"]}>
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <div ref={ref} />
    </div>
  );
}

export default ArticleList;
