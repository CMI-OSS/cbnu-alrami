import { Link } from "react-router-dom";

import BorderBox from "@components/atoms/BorderBox";
import SubscriptionModalTemplate from "@components/templates/SubscriptionModalTemplate";
import { GUIDE } from "src/page/Subscription/constant";

import $ from "./style.module.scss";

function Start() {
  const COMMON_START_CONTENTS = [
    {
      title: "공통",
      description: "충북대학교의 다향한 공지사항을 확인해요",
      link: "/subscription/common",
    },
    {
      title: "전공",
      description: "전공 별 공지사항을 확인해요",
      link: "/subscription/major",
    },
  ];

  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.title}>전체</div>
        <div className={$.content}>{GUIDE.common_start}</div>
      </div>
      {COMMON_START_CONTENTS.map((content) => {
        return (
          <Link to={content.link} key={content.link}>
            <BorderBox
              key={content.title}
              height={87}
              background="#F6F5FB"
              style={{ marginBottom: "12px" }}
            >
              <div className={$["subscription-box-content"]}>
                <span className={$.title}>{content.title}</span>
                <span className={$.content}>{content.description}</span>
              </div>
            </BorderBox>
          </Link>
        );
      })}
    </SubscriptionModalTemplate>
  );
}

export default Start;
