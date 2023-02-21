import React from "react";

import {
  Alarm,
  Subscription,
  UnAlarm,
  UnSubscription,
} from "@components/atoms/icon";
import {
  useNoticeBoardMutation,
  useSubscribeBoardMutation,
  useUnNoticeBoardMutation,
  useUnSubscribeBoardMutation,
} from "@hooks/api/board";

import $ from "./style.module.scss";

type Props = {
  id: number;
  isNotice: boolean;
  isSubscribe: boolean;
};

function SubscriptionNoticeGroup({ id, isNotice, isSubscribe }: Props) {
  const uuid = "1111";
  const postSubscribeBoard = useSubscribeBoardMutation({ id, uuid });
  const deleteSubscribeBoard = useUnSubscribeBoardMutation({ id, uuid });
  const postNoticeBoard = useNoticeBoardMutation({ id, uuid });
  const deleteUnNoticeBoard = useUnNoticeBoardMutation({ id, uuid });

  const handleUnNoticeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteUnNoticeBoard.mutate({ id, uuid });
  };

  const handleNoticeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postNoticeBoard.mutate({ id, uuid });
  };

  const handleUnSubscriptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    deleteSubscribeBoard.mutate({ id, uuid });
  };

  const handleSubscriptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postSubscribeBoard.mutate({ id, uuid });
  };

  return (
    <div className={$["subscription-notice-group"]}>
      {isSubscribe ? (
        <div className={$.group}>
          <button type="button" onClick={handleUnSubscriptionClick}>
            <Subscription size={30} stroke="#D66D6E" />
          </button>
          {isNotice ? (
            <button type="button" onClick={handleUnNoticeClick}>
              <Alarm size={22} stroke="#D66D6E" />
            </button>
          ) : (
            <button type="button" onClick={handleNoticeClick}>
              <UnAlarm size={22} stroke="#AAAAAA" />
            </button>
          )}
        </div>
      ) : (
        <button type="button" onClick={handleSubscriptionClick}>
          <UnSubscription size={30} stroke="#AAAAAA" />
        </button>
      )}
    </div>
  );
}

export default SubscriptionNoticeGroup;
