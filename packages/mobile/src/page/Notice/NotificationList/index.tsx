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
import Notification from "src/page/Notice/Notification";

import $ from "./style.module.scss";

const useNotifications = (target: string) => {
  if (target === "bookmark" || target === "popular") {
    const { data: articlesData } =
      target === "bookmark" ? useBookmarkArticles() : usePopularArticles();
    return articlesData?.data.map((data) => {
      return {
        ...data,
        breadcrumb: data.board.parent
          ? `${data.board.parent.name} > ${data.board.name}`
          : data.board.name,
      };
    });
  }
  const { data: articlesData } =
    target === "new"
      ? useNewArticles({ pageNo: 2 })
      : useArticlesByBoard(Number(target), {
          pageNo: 2,
        });

  return articlesData?.data.contents?.map((data) => {
    return {
      ...data,
      breadcrumb: data.board.parent
        ? `${data.board.parent.name} > ${data.board.name}`
        : data.board.name,
    };
  });
};

function NotificationList() {
  const type = useSearch({ target: "type" }) as "bookmark" | "new" | "popular";
  const major = useSearch({ target: "major" });
  const notifications = useNotifications(type || major);

  if (!notifications?.length && type === "bookmark") {
    return (
      <img
        className={$["empty-img"]}
        src={guideEmptyBookmark}
        alt="북마크한 공지사항 미존재"
      />
    );
  }

  if (!notifications?.length && type === "new") {
    return (
      <img
        className={$["empty-img"]}
        src={guideEmptySubscription}
        alt="구독하는 공지사항 게시판 미존재"
      />
    );
  }

  if (!notifications?.length) {
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
      {notifications?.map((data) => {
        return <Notification key={data.id} notification={data} />;
      })}
    </div>
  );
}

export default NotificationList;
