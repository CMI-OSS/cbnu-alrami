import { Link } from "react-router-dom";

import BorderBox from "@components/atoms/BorderBox";
import { Close, LeftArrow } from "@components/atoms/icon";
import { GUIDE } from "src/page/Subscription/constant";
import $ from "src/page/Subscription/style.module.scss";

export const commonMockData = [
  {
    id: 1,
    name: "국제교류본부",
    isCommon: true,
    children: [
      {
        id: 1,
        isCommon: true,
        name: "공지사항",
        url: "www.dksk.com",
        isSubscribing: true,
        isNoticing: true,
      },
    ],
  },
];

function CommonProcess() {
  return (
    <div className={$.subscription}>
      <div className={$.header}>
        <LeftArrow />
        <Close />
      </div>
      <div className={$.process}>
        <div className={$.guide}>
          <div className={$.title}>전체&nbsp;&gt;&nbsp;공통</div>
          <div className={$.content}>{GUIDE.all_depth1}</div>
        </div>
        {commonMockData.map((data) => (
          <Link to={`/subscription/common/${data.id}`} key={data.id}>
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
      </div>
    </div>
  );
}

export default CommonProcess;
