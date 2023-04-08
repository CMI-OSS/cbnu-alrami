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
import classnames from "classnames";
import { useAppDispatch } from "src/store";
import { setHasFooter } from "src/store/toastSlice";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  id: number;
  isNotice: boolean;
  isSubscribe: boolean;
} & DefaultProps;

function SubscriptionNoticeGroup({
  id,
  isNotice,
  isSubscribe,
  className,
}: Props) {
  const dispatch = useAppDispatch();
  const postSubscribeBoard = useSubscribeBoardMutation({ id });
  const deleteSubscribeBoard = useUnSubscribeBoardMutation({ id });
  const postNoticeBoard = useNoticeBoardMutation({ id });
  const deleteUnNoticeBoard = useUnNoticeBoardMutation({ id });

  const handleUnNoticeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteUnNoticeBoard.mutate({ id });
  };

  const handleNoticeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postNoticeBoard.mutate({ id });
  };

  const handleUnSubscriptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    deleteSubscribeBoard.mutate({ id });
  };

  const handleSubscriptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postSubscribeBoard.mutate({ id });
  };

  const handleGroupClick = () => {
    dispatch(setHasFooter({ hasFooter: false }));
  };

  return (
    <button
      type="button"
      className={classnames($["subscription-notice-group"], className)}
      onClick={handleGroupClick}
    >
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
              <UnAlarm size={22} stroke="#5E5E5E" />
            </button>
          )}
        </div>
      ) : (
        <button type="button" onClick={handleSubscriptionClick}>
          <UnSubscription size={30} stroke="#5E5E5E" />
        </button>
      )}
    </button>
  );
}

export default SubscriptionNoticeGroup;
