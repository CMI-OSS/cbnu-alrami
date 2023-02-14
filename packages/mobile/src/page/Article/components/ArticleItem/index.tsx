import dayjs from "dayjs";

import $ from "./style.module.scss";

type Props = {
  title: string;
  createdDateTime: string;
  viewCount: number;
  bookmarkCount: number;
};

function ArticleItem({
  title,
  createdDateTime,
  viewCount,
  bookmarkCount,
}: Props) {
  return (
    <div className={$["article-item"]}>
      <div className={$["board-name"]}>제목</div>
      <div className={$.title}>{title}</div>
      <div className={$.info}>
        <span>{dayjs(createdDateTime).format("YYYY-MM-DD")}</span>&nbsp;/&nbsp;
        <span>조회수&nbsp;{viewCount}</span>
        &nbsp;/&nbsp;<span>좋아요&nbsp;{bookmarkCount}</span>
      </div>
    </div>
  );
}

export default ArticleItem;
