import {
  useBoardArticlesQuery,
  useBookmarkArticlesQuery,
  useNewArticlesQuery,
  usePopularArticlesQuery,
} from "@hooks/api/article";
import { useIntersect } from "@hooks/UseIntersect";
import useSearch from "@hooks/useSearch";
import guideEmptyBookmark from "src/assets/guide_empty_bookmark.png";
import guideEmptyNotice from "src/assets/guide_empty_notice.png";
import guideEmptySubscription from "src/assets/guide_empty_subscription.png";
import Article from "src/page/Notice/Article";

import $ from "./style.module.scss";

const useArticles = (target: string) => {
  if (target === "bookmark") return useBookmarkArticlesQuery();
  if (target === "popular") return usePopularArticlesQuery();
  if (target === "new") return useNewArticlesQuery();
  return useBoardArticlesQuery(Number(target));
};

function ArticleList() {
  const target = useSearch({ target: "type" }) || "new";
  const { data, hasNextPage, isFetching, fetchNextPage } = useArticles(target);
  const articles = data?.pages;
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  if (!articles?.length && target === "bookmark") {
    return (
      <img
        className={$["empty-img"]}
        src={guideEmptyBookmark}
        alt="북마크한 공지사항 미존재"
      />
    );
  }

  if (!articles?.length && target === "new") {
    return (
      <img
        className={$["empty-img"]}
        src={guideEmptySubscription}
        alt="구독하는 공지사항 게시판 미존재"
      />
    );
  }

  if (!articles?.length) {
    return (
      <img
        className={$["empty-img"]}
        src={guideEmptyNotice}
        alt="공지사항 미존재"
      />
    );
  }
  return (
    <div className={$["notification-list"]}>
      {articles?.map((article) => {
        return article.contents.map((articleData) => {
          const breadcrumb = `${articleData.board.parent?.name} > ${articleData.board.name}`;
          const { id, title, date, hits, scraps } = articleData;
          return (
            <Article
              key={id}
              type="cbnu"
              {...{ id, title, date, hits, breadcrumb, scraps }}
            />
          );
        });
      })}
      <div ref={ref} />
    </div>
  );
}

export default ArticleList;
