import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";

import Footer from "./Footer";
import $ from "./style.module.scss";

function NoticeDetail() {
  return (
    <div className={$["notice-detail"]}>
      <FullPageModalTemplate
        left={<LeftArrow width="16" height="16" color="#AAAAAA" />}
        title="하이"
      >
        <div className={$.children}>
          <div className={$.header}>
            <div className={$.title}>제목이고요</div>
            <div className={$.detail}>
              <div className={$.dates}>22-02-02&nbsp;/&nbsp;</div>
              <div className={$.hits}>조회수&nbsp;100&nbsp;/&nbsp;</div>
              <div className={$.scraps}>스크랩&nbsp;1000</div>
            </div>
          </div>
          <div className={$.content}>실제내용들어가요</div>
        </div>
        <Footer />
      </FullPageModalTemplate>
    </div>
  );
}

export default NoticeDetail;
