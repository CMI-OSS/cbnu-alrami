import useSearch from "@hooks/useSearch";
import { useArticlesByBoard } from "src/api/article";
import guideEmptyBookmark from "src/assets/guide_empty_bookmark.png";
import guideEmptySubscription from "src/assets/guide_empty_subscription.png";
import Notification from "src/page/Notice/Notification";

import $ from "./style.module.scss";

const useNotifications = (target: string) => {
  let articles;
  if (target === "bookmark") {
    articles = [];
    return articles;
  }
  if (target === "new") {
    articles = [];
    return articles;
  }
  if (target === "popular") {
    articles = [
      {
        id: 1,
        title: "popular",
        dates: "2022-02-02",
        hits: 333,
        breadcrumb: "a>b",
        scraps: 3,
      },
    ];
    return articles;
  }
  const { data } = useArticlesByBoard(Number(target), { pageNo: 2 });
  articles = data?.data.contents?.map((data) => {
    return {
      ...data,
      breadcrumb: data.board.parent
        ? `${data.board.parent} >${data.board.name}`
        : data.board.name,
    };
  });
  return articles;
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

  if (!notifications?.length) {
    return (
      <img
        className={$["empty-img"]}
        src={guideEmptySubscription}
        alt="구독하는 공지사항 게시판 미존재"
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
