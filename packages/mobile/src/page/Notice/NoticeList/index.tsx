import {
  useArticlesByBoard,
  useBookmarkArticles,
  useNewArticles,
  usePopularArticles,
} from "src/api/article";
import guideEmptyBookmark from "src/assets/guide_empty_bookmark.png";
import guideEmptyNotice from "src/assets/guide_empty_notice.png";
import guideEmptySubscription from "src/assets/guide_empty_subscription.png";
import NoticeItem from "src/page/Notice/NoticeItem";

import $ from "./style.module.scss";

type Props = {
  target: string;
};

const useNotices = (target: string) => {
  if (target === "bookmark") return useBookmarkArticles();
  if (target === "popular") return usePopularArticles();
  if (target === "new") return useNewArticles({ pageNo: 2 });
  return useArticlesByBoard(Number(target), { pageNo: 2 });
};

function NoticeList({ target }: Props) {
  const { data } = useNotices(target);
  const notices = data?.contents;

  if (!notices?.length && target === "bookmark") {
    return (
      <img
        className={$["empty-img"]}
        src={guideEmptyBookmark}
        alt="북마크한 공지사항 미존재"
      />
    );
  }

  if (!notices?.length && target === "new") {
    return (
      <img
        className={$["empty-img"]}
        src={guideEmptySubscription}
        alt="구독하는 공지사항 게시판 미존재"
      />
    );
  }

  if (!notices?.length) {
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
      {notices?.map(({ id, title, date, hits, breadcrumb, scraps }) => {
        return (
          <NoticeItem
            key={id}
            {...{ id, title, date, hits, breadcrumb, scraps }}
          />
        );
      })}
    </div>
  );
}

export default NoticeList;
