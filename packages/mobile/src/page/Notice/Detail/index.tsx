import { useParams } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import dayjs from "dayjs";
import { useArticle } from "src/api/article";

import Footer from "./Footer";
import $ from "./style.module.scss";

function NoticeDetail() {
  const { noticeId } = useParams();
  const { isLoading, error, data } = useArticle(Number(noticeId));
  if (!data || error || isLoading) return <></>;
  const notice = data.data;
  return (
    <div className={$["notice-detail"]}>
      <FullPageModalTemplate
        left={<LeftArrow size={16} stroke="#AAAAA6A" />}
        title={notice.board.name}
      >
        <div className={$.children}>
          <div className={$.header}>
            <h1 className={$.title}>{notice.title}</h1>
            <div className={$.detail}>
              <span className={$.date}>
                {dayjs(notice.date).format("YY-MM-DD")}&nbsp;/&nbsp;
              </span>
              <span className={$.hits}>
                조회수&nbsp;{notice.hits}&nbsp;/&nbsp;
              </span>
              <span className={$.scraps}>스크랩&nbsp;{notice.scraps}</span>
            </div>
          </div>
          <div
            className={$.content}
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />
        </div>
        <Footer className={$.footer} />
      </FullPageModalTemplate>
    </div>
  );
}

export default NoticeDetail;
