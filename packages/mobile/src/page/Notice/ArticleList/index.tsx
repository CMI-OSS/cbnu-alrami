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
  const target = useSearch({ target: "type" }) || "new";
  const { data } = useArticles(target);
  const articles = data?.contents;

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
