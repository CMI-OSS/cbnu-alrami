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
import { DefaultProps } from "src/type/props";
import { toastSuccess } from "src/utils/toast";

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
  const postSubscribeBoard = useSubscribeBoardMutation({ id });
  const deleteSubscribeBoard = useUnSubscribeBoardMutation({ id });
  const postNoticeBoard = useNoticeBoardMutation({ id });
  const deleteUnNoticeBoard = useUnNoticeBoardMutation({ id });

  const handleUnNoticeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteUnNoticeBoard.mutate(
      { id },
      {
        onSuccess: () => {
          toastSuccess({
            message: "구독이 해제되었습니다.",
          });
        },
      },
    );
  };

  const handleNoticeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postNoticeBoard.mutate(
      { id },
      {
        onSuccess: () => {
          toastSuccess({
            message: "구독이 추가되었습니다.",
          });
        },
      },
    );
  };

  const handleUnSubscriptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    deleteSubscribeBoard.mutate(
      { id },
      {
        onSuccess: () => {
          toastSuccess({
            message: "알림이 해제되었습니다.",
          });
        },
      },
    );
  };

  const handleSubscriptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postSubscribeBoard.mutate(
      { id },
      {
        onSuccess: () => {
          toastSuccess({
            message: "알림이 설정되었습니다.",
          });
        },
      },
    );
  };

  return (
    <div className={classnames($["subscription-notice-group"], className)}>
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
