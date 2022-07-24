import { useParams } from "react-router-dom";

import {
  Alarm,
  Close,
  LeftArrow,
  Subscription,
  UnSubscription,
} from "@components/atoms/icon";
import BorderBox from "src/components/atoms/BorderBox";
import { Arrow } from "src/components/atoms/icon/Arrow";
import { commonMockData } from "src/page/Subscription/CommonProcess";
import { GUIDE } from "src/page/Subscription/constant";
import { majorMockData } from "src/page/Subscription/MajorProcess1";
import $ from "src/page/Subscription/style.module.scss";

const 구독안함 = () => {
  return (
    <UnSubscription color="#AAAAAA" style={{ width: "32px", height: "21px" }} />
  );
};

const 구독하고알람함 = () => {
  return (
    <>
      <Subscription
        color="#D66D6E"
        style={{ width: "32px", height: "21px", marginRight: "20px" }}
      />
      <Alarm color="#D66D6E" style={{ width: "22px", height: "22px" }} />
    </>
  );
};

const 구독하고알람안함 = () => {
  return (
    <>
      <Subscription
        color="#D66D6E"
        style={{ width: "32px", height: "21px", marginRight: "20px" }}
      />
      <Alarm color="#aaaaaa" style={{ width: "22px", height: "22px" }} />
    </>
  );
};

function End() {
  const { id, fullId } = useParams();
  const type = fullId ? "전공" : "전체";
  const data: any[] = type === "전체" ? commonMockData : majorMockData;
  const mockData = data.find((d) => `${d.id}` === fullId ?? id);

  const fullName = mockData?.name;
  const children =
    type === "전체" ? mockData?.children : mockData.children[0].children;

  return (
    <div className={$.subscription}>
      <div className={$.header}>
        <LeftArrow />
        <Close />
      </div>
      <div className={$.guide}>
        <div className={$.title}>
          {type}&nbsp;&gt;{fullName}
        </div>
        <div className={$.content}>
          <UnSubscription
            style={{
              width: "36px",
              height: "24px",
            }}
            color="#aaaaaa"
          />
          {GUIDE.common_end}
        </div>
      </div>
      {children.map((content: any) => {
        return (
          <BorderBox
            key={content.id}
            height={87}
            background="#F6F5FB"
            style={{ marginBottom: "12px" }}
          >
            <div className={$["subscription-box-base"]}>
              <div className={$.left}>
                <span className={$.title}>{content.name}</span>
                <Arrow width={4} height={13} color="#AAAAAA" />
              </div>
              <div className={$.right}>
                {content.isSubscribing && content.isNoticing && (
                  <구독하고알람함 />
                )}
                {content.isSubscribing && !content.isNoticing && (
                  <구독하고알람안함 />
                )}
                {!content.isSubscribing && <구독안함 />}
              </div>
            </div>
          </BorderBox>
        );
      })}
    </div>
  );
}

export default End;
