import { Link } from "react-router-dom";

import SubscriptionNoticeGroup from "@components/shared/SubscriptionNoticeGroup";
import { useSubscribeBoardsQuery } from "@hooks/api/board";
import guideEmptySubscriptionSetting from "src/assets/guide_empty_subscription_setting.svg";

import $ from "./style.module.scss";

function SettingBoardBody() {
  const { data: subscribeBoardsData } = useSubscribeBoardsQuery();

  if (!subscribeBoardsData?.length) {
    return (
      <div className={$["empty-subscription"]}>
        <img
          src={guideEmptySubscriptionSetting}
          width={283}
          alt="구독중인 공지사항 없음"
        />
      </div>
    );
  }

  return (
    <div className={$.subscription}>
      {subscribeBoardsData?.map((subscribeBoardData) => {
        const { id, combinedName, isNotice, isSubscribe } = subscribeBoardData;
        return (
          <Link key={id} className={$.item} to={`/board/article/${id}`}>
            <span>{combinedName}</span>
            <SubscriptionNoticeGroup
              className={$.buttons}
              id={id}
              isNotice={isNotice ?? false}
              isSubscribe={isSubscribe ?? false}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default SettingBoardBody;
