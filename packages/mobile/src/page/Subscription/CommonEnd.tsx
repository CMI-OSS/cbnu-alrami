import { Alarm, Subscription, UnSubscription } from "@components/atoms/icon";
import { Arrow } from "@components/atoms/icon/Arrow";
import BorderBox from "src/components/atoms/BorderBox";
import { GUIDE } from "src/page/Subscription/constant";
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

function CommonEnd() {
  const COMMON_END_CONTENTS = [
    { title: "학부공지", isSubscribe: false, isAlarm: false },
    { title: "대학원공지", isSubscribe: true, isAlarm: true },
    { title: "대학원공지", isSubscribe: true, isAlarm: false },
  ];

  return (
    <div className={$["common-start"]}>
      <div className={$.guide}>
        <div className={$.title}>전체</div>
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
      {COMMON_END_CONTENTS.map((content) => {
        return (
          <BorderBox
            height={87}
            background="#F6F5FB"
            style={{ marginBottom: "12px" }}
          >
            <div className={$["subscription-box-base"]}>
              <div className={$.left}>
                <span className={$.title}>{content.title}</span>
                <Arrow width={4} height={13} color="#AAAAAA" />
              </div>
              <div className={$.right}>
                {content.isSubscribe && content.isAlarm && <구독하고알람함 />}
                {content.isSubscribe && !content.isAlarm && (
                  <구독하고알람안함 />
                )}
                {!content.isSubscribe && <구독안함 />}
              </div>
            </div>
          </BorderBox>
        );
      })}
    </div>
  );
}

export default CommonEnd;
