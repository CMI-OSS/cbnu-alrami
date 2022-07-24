import { Link } from "react-router-dom";

import BorderBox from "@components/atoms/BorderBox";
import SubscriptionModalTemplate from "src/components/templates/SubscriptionModalTemplate";
import { GUIDE } from "src/page/Subscription/constant";
import $ from "src/page/Subscription/style.module.scss";

export const majorMockData = [
  {
    id: 2,
    name: "전자정보대학",
    isCommon: false,
    children: [
      {
        id: 1,
        name: "소프트웨어",
        isCommon: false,
        children: [
          {
            id: 4,
            name: "소웨 학생회",
            url: "www.dksk.com",
            isCommon: false,
            isSubscribing: true,
            isNoticing: true,
          },
          {
            id: 5,
            name: "학부공지",
            url: "www.dksk.com",
            isCommon: false,
            isSubscribing: true,
            isNoticing: false,
          },
          {
            id: 6,
            name: "대학원공지",
            url: "www.dksk.com",
            isCommon: false,
            isSubscribing: false,
            isNoticing: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "경영대학",
    isCommon: false,
    children: [
      {
        id: 5,
        name: "경영 학생회",
        url: "www.ksy.stu.com",
        isCommon: false,
        isSubscribing: true,
        isNoticing: false,
        children: [
          {
            id: 5,
            name: "학부공지",
            url: "www.dksk.com",
            isCommon: false,
            isSubscribing: true,
            isNoticing: false,
          },
          {
            id: 6,
            name: "대학원공지",
            url: "www.dksk.com",
            isCommon: false,
            isSubscribing: false,
            isNoticing: false,
          },
        ],
      },
      {
        id: 10102,
        name: "경영정보학과",
        url: "https://mis.chungbuk.ac.kr/master.php?pg_idx=7",
        isCommon: false,
        isSubscribing: true,
        isNoticing: false,
      },
    ],
  },
];

function MajorProcess1() {
  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.title}>전체&nbsp;&gt;&nbsp;전공</div>
        <div className={$.content}>{GUIDE.all_depth1}</div>
      </div>
      {majorMockData.map((data) => (
        <Link to={`/subscription/major/${data.id}`} key={data.id}>
          <BorderBox
            key={data.name}
            height={87}
            background="#F6F5FB"
            style={{ marginBottom: "12px" }}
          >
            <div className={$["subscription-box-base"]}>
              <span className={$.title}>{data.name}</span>
            </div>
          </BorderBox>
        </Link>
      ))}
    </SubscriptionModalTemplate>
  );
}

export default MajorProcess1;
