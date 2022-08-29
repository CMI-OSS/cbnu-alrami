import { useIntersect } from "@hooks/UseIntersect";
import useSearch from "@hooks/useSearch";
import {
  useArticlesByBoard,
  useBookmarkArticles,
  useNewArticles,
  usePopularArticles,
} from "src/api/article";
import guideEmptyBookmark from "src/assets/guide_empty_bookmark.png";
import guideEmptyNotice from "src/assets/guide_empty_notice.png";
import guideEmptySubscription from "src/assets/guide_empty_subscription.png";
import Article from "src/page/Notice/Article";

import $ from "./style.module.scss";

const useArticles = (target: string) => {
  if (target === "bookmark") return useBookmarkArticles();
  if (target === "popular") return usePopularArticles();
  if (target === "new") return useNewArticles();
  return useArticlesByBoard({ boardId: Number(target) });
};

function ArticleList() {
  // TODO: 확인
  const target = useSearch({ target: "type" }) || "new";
  const { data, hasNextPage, isFetching, fetchNextPage } = useArticles(target);
  const articles = data?.contents;

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && isFetching) {
      fetchNextPage();
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
    <div className={$["notification-list"]} ref={ref}>
      {articles?.map(({ id, title, date, hits, breadcrumb, scraps }) => {
        return (
          <Article
            key={id}
            {...{ id, title, date, hits, breadcrumb, scraps }}
          />
        );
      })}
    </div>
  );
}

export default ArticleList;
