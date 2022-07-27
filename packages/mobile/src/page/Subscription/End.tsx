import { useParams } from "react-router-dom";

import {
  Alarm,
  Arrow,
  Subscription,
  UnAlarm,
  UnSubscription,
} from "@components/atoms/icon";
import { useLastChildBoardTree } from "src/api/boardTree";
import BorderBox from "src/components/atoms/BorderBox";
import { GUIDE } from "src/page/Subscription/constant";
import $ from "src/page/Subscription/style.module.scss";

import SubscriptionModalTemplate from "./SubscriptionModalTemplate";

export const 구독안함 = () => {
  return (
    <UnSubscription color="#AAAAAA" style={{ width: "32px", height: "21px" }} />
  );
};

export const 구독하고알람함 = () => {
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

export const 구독하고알람안함 = () => {
  return (
    <>
      <Subscription
        color="#D66D6E"
        style={{ width: "32px", height: "21px", marginRight: "20px" }}
      />
      <UnAlarm color="#aaaaaa" style={{ width: "22px", height: "22px" }} />
    </>
  );
};

function End() {
  const { collegeId, majorId } = useParams();
  const { data: lastChildBoardTree, breadCrumb } = useLastChildBoardTree(
    Number(collegeId),
    Number(majorId),
  );

  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.title}>{breadCrumb}</div>
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
      {lastChildBoardTree?.map((data) => {
        return (
          <BorderBox
            key={data.id}
            height={87}
            background="#F6F5FB"
            style={{ marginBottom: "12px" }}
          >
            <div className={$["subscription-box-base"]}>
              <div className={$.left}>
                <span className={$.title}>{data.name}</span>
                <Arrow width={4} height={13} color="#AAAAAA" />
              </div>
              <div className={$.right}>
                {data.isSubscribing && data.isNoticing && <구독하고알람함 />}
                {data.isSubscribing && !data.isNoticing && <구독하고알람안함 />}
                {!data.isSubscribing && <구독안함 />}
              </div>
            </div>
          </BorderBox>
        );
      })}
    </SubscriptionModalTemplate>
  );
}

export default End;
