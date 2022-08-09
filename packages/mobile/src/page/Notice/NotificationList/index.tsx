import { useArticlesByBoard } from "src/api/article";
import Notification from "src/page/Notice/Notification";

import $ from "./style.module.scss";

function NotificationList() {
  const { data } = useArticlesByBoard(1, { pageNo: 2 });
  const articleByBoardIdData = data?.data.contents;
  const articleByBoardId = articleByBoardIdData?.map((data) => {
    const { id, title, hits, scraps, dates } = data;
    const breadcrumb = `${data.board.parent?.name} > ${data.board.name}`;
    return {
      id,
      title,
      hits,
      scraps,
      dates,
      breadcrumb,
    };
  });
  return (
    <div className={$["notification-list"]}>
      {articleByBoardId?.map((data) => {
        return <Notification notification={data} />;
      })}
    </div>
  );
  return <div>hi</div>;
}

export default NotificationList;
