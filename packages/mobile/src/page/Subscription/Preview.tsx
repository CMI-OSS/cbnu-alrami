import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import NotificationList from "src/page/Notice/NoticeList";

import { 구독하고알람안함 } from "./End";

function Preview() {
  return (
    <FullPageModalTemplate
      left={
        <>
          <LeftArrow stroke="#AAAAAA" size={16} />
          <span
            style={{ marginLeft: "21px", fontSize: "18px", fontWeight: 500 }}
          >
            학부 공지
          </span>
        </>
      }
      right={<구독하고알람안함 />}
    >
      <NotificationList />
    </FullPageModalTemplate>
  );
}

export default Preview;
