import { useParams } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import dayjs from "dayjs";
import { useArticles } from "src/api/article";

import Footer from "./Footer";
import $ from "./style.module.scss";

function NoticeDetail() {
  const { noticeId } = useParams();
  const { isLoading, error, data } = useArticles(Number(noticeId));
  if (!data || error || isLoading) return <></>;
  const notice = data.data;
  return (
    <div className={$["notice-detail"]}>
      <FullPageModalTemplate
        left={<LeftArrow width="16" height="16" color="#AAAAAA" />}
        title={notice.board.name}
      >
        <div className={$.children}>
          <div className={$.header}>
            <div className={$.title}>{notice.title}</div>
            <div className={$.detail}>
              <div className={$.dates}>
                {dayjs(notice.date).format("YY-MM-DD")}&nbsp;/&nbsp;
              </div>
              <div className={$.hits}>
                조회수&nbsp;{notice.hits}&nbsp;/&nbsp;
              </div>
              <div className={$.scraps}>스크랩&nbsp;{notice.scraps}</div>
            </div>
          </div>
          {/* eslint-disable-next-line react/no-danger */}
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
