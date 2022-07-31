import { useArticleByBoardId } from "src/api/article";
import Notification from "src/page/Notice/Notification";

import $ from "./style.module.scss";

function NotificationList() {
  const { data: articleByBoardIdData } = useArticleByBoardId(1);
  const articleByBoardId = articleByBoardIdData?.data.map((data) => {
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
      {articleByBoardId?.map((data) => (
        <Notification notification={data} />
      ))}
    </div>
  );
}

export default NotificationList;
